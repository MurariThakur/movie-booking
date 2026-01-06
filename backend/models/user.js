import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: string, requied: true },
  name: { type: string, required: true },
  email: { type: string, required: true},
  image: { type: string },
});

const User = mongoose.model("User", userSchema);
export default User;
