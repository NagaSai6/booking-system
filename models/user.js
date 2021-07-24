const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "FTE",
    },
    msToken:{
      type:String,
      required:true
    },
    msId: {
      type: String,
      required: true,
    },
    msUserName: {
      type: String,
      required: true,
    },
    outLookMail: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
