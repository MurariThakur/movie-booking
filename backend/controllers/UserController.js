import User from "../models/user.js";
import Booking from "../models/Booking.js";
import { clerkClient } from "@clerk/express";
import Movie from "../models/Movie.js";

const getUserBooking = async (req, res) => {
  try {
    const user = req.auth.userId;
    const bookings = await Booking.find({ user })
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

const UpdateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);

    if (!user.privateMetadata.favourites) {
      user.privateMetadata.favourites = [];
    }

    if (!user.privateMetadata.favourites.includes(movieId)) {
      user.privateMetadata.favourites.push(movieId);
    } else {
      user.privateMetadata.favourites = user.privateMetadata.favourites.filter(
        (item) => item !== movieId
      );
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: user.privateMetadata,
    });

    res.json({ success: true, message: "favourites movies updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);
    const favourites = user.privateMetadata.favourites;
    const movie = await Movie.find({ _id: { $in: favourites } });
    res.json({ success: true, movie });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};

export { getUserBooking  , UpdateFavorite, getFavorites };
