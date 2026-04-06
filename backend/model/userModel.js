const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["viewer", "analyst", "admin"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inActive"],
    required: true,
  },
  created_at: {
    type: String,
    default: new Date(),
  },
  updated_at: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
