import mongoose from "mongoose";
const { Schema } = mongoose;

// Database collection schema
const credentialSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
});

export const Credential = mongoose.model("Credential", credentialSchema);
