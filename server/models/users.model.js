import mongoose from "mongoose";
const { Schema } = mongoose;

// Database collection schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    type: [{}],
    required: true,
  },
  role: {
    type: String,
    enum: ["normal", "manager", "admin"],
    default: "normal",
    required: true,
  },
});

// Compile model from Schemaa
export const User = mongoose.model("User", userSchema);
