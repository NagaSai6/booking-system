const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  { 
      category:{
          type: String,
          default:"Instruments"
      },
    categoryName: {
      type: String,
      required: true,
    },
    availableInstrumentsInCategory: {
      type: Number,
      required: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
