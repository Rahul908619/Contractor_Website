const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    // FIX: Added publicId to enable proper Cloudinary deletion
    publicId: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    // FIX: Expanded category list to match real project types
    category: {
      type: String,
      enum: ["marble", "bathroom", "commercial", "residential", "staircase", "custom", "tiles"],
      default: "marble",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
