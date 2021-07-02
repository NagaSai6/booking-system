const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "customer",
    },
    googleId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    gmail: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
