const mongoose = require("mongoose");

// FIX: Proper Price model with all needed fields
const priceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      // e.g. "Marble Flooring", "Bathroom Work", "Installation"
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // null means "Contact Us for Price" on the website
    price: {
      type: Number,
      default: null,
    },
    unit: {
      type: String,
      default: "sq ft",
      // e.g. "sq ft", "piece", "project", "stair"
    },
    // Track whether price came from a PDF upload or manual entry
    fromPdf: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Price", priceSchema);
