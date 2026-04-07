const cloudinary = require("../config/cloudinary");
const Gallery    = require("../models/gallery.model");

// ── Upload media (image or video) ─────────────────────────────────────────
exports.uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // FIX: Use Promise wrapper (same pattern as service.controller.js)
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",           // handles image + video
          folder: "sk-tiles/gallery",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    const newItem = await Gallery.create({
      title:     req.body.title,
      mediaUrl:  result.secure_url,
      publicId:  result.public_id,           // FIX: save publicId for delete
      type:      result.resource_type === "video" ? "video" : "image",
      category:  req.body.category || "marble",
    });

    res.status(201).json({
      success: true,
      message: "Uploaded successfully",
      data: newItem,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Get all gallery items ─────────────────────────────────────────────────
exports.getGallery = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const data   = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Delete media (DB + Cloudinary) ────────────────────────────────────────
exports.deleteMedia = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    // FIX: Delete from Cloudinary first using saved publicId
    if (item.publicId) {
      await cloudinary.uploader.destroy(item.publicId, {
        resource_type: item.type === "video" ? "video" : "image",
      });
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted from gallery and Cloudinary" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
