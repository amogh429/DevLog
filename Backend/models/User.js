import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+$/, "Please use a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password length must be greater than equal to 6"],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
