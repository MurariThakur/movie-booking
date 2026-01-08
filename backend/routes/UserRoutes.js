import express from "express";
import {
  getUserBooking,
  UpdateFavorite,
  getFavorites,
} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/booking", getUserBooking);
userRouter.post("/update-favorite", UpdateFavorite);
userRouter.get("/favorites", getFavorites);

export default userRouter;
