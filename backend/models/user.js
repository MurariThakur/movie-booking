import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type:String, requied: true },
  name: { type: String, required: true },
  email: { type: String, required: true},
  image: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
