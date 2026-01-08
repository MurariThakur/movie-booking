import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
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
    const { userId } = req.auth;

    const { showId, seleatedSeats } = req.body;
    const { origin } = req.headers;

    const isAvailable = await checkSeatAvailability(showId, seleatedSeats);

    if (!isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Seats are already taken" });
    }

    const showData = await Show.findById(showId).populate("movie");

    const booking = new Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * seleatedSeats.length,
      bookedSeats: seleatedSeats,
    });

    seleatedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    res.json({
      success: true,
      booking: booking,
      message: "Booking created successfully",
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
    const occupiedSeats = object.keys(showData.occupiedSeats);
    res.json({ success: true, occupiedSeats: occupiedSeats });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, error: error.message });
  }
};

export  { createBooking, getOccupiedSeats };
