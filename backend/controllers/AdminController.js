import Show from "../models/Show.js";
import Booking from "../models/Booking.js";

const isAdmin = (req, res) => {
  res.json({ success: true, isAdmin: true });
};

const getDashboardData = async (req, res) => {
  try {
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");
    const bookings = await Booking.find({}).populate("show");
    totalUser = await User.countDocuments();

    const dashboardData = {
      totalBooking: bookings.length,
      totalRevenue: bookings.reduce(
        (total, booking) => total + booking.amount,
        0
      ),
      totalUser: totalUser,
      show: activeShows,
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};

const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "movie",
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};


export {
  isAdmin,
  getDashboardData,
  getAllShows,
  getAllBookings,
};