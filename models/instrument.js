const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    instrumentName: {
      type: String,
      required: true,
      unique:true
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Instrument = new mongoose.model("Instrument", instrumentSchema);

module.exports = Instrument;