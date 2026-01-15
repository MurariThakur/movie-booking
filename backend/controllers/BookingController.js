import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import Stripe from "stripe";
import { inngest } from "../inngest/index.js";
const checkSeatAvailability = async (showId, seleatedSeats) => {
  try {
    const show = await Show.findById(showId);
    const occupiedSeats = show.occupiedSeats;
    const isAnySeatTaken = seleatedSeats.some((seat) => occupiedSeats[seat]);
    return !isAnySeatTaken;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();

    const { showId, seleatedSeats } = req.body;
    const { origin } = req.headers;
    const isAvailable = await checkSeatAvailability(showId, seleatedSeats);

    if (!isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Seats are already taken" });
    }

    const showData = await Show.findById(showId).populate("movie");

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * seleatedSeats.length,
      bookedSeats: seleatedSeats,
    });

    seleatedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    //Stripe Payment Integration
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: showData.movie.title,
          },
          unit_amount: showData.showPrice * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/loading/my-bookings`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        bookingId: booking._id.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes from now
    });

    booking.paymentLink = session.url;
    await booking.save();

    await inngest.send({
      name: "app/checkpayment",
      data: { bookingId: booking._id.toString() },
    });

    res.json({
      success: true,
      booking: booking,
      url: session.url,
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, error: error.message });
  }
};

const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    const occupiedSeats = Object.keys(showData.occupiedSeats);
    res.json({ success: true, occupiedSeats: occupiedSeats });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, error: error.message });
  }
};

export { createBooking, getOccupiedSeats };
