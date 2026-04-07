const Service    = require("../models/service.model");
const cloudinary = require("../config/cloudinary");

// ── CREATE SERVICE ────────────────────────────────────────────────────────
exports.createService = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ success: false, message: "Image is required" });

    const upload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "sk-tiles/services" },
        (error, result) => { if (error) reject(error); else resolve(result); }
      );
      stream.end(file.buffer);
    });

    const service = await Service.create({
      title:       req.body.title,
      description: req.body.description,
      image:       upload.secure_url,
      publicId:    upload.public_id,
    });

    res.status(201).json({ success: true, message: "Service created", data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET ALL SERVICES (public) ─────────────────────────────────────────────
// FIX: Added try-catch — was missing before
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE SERVICE ────────────────────────────────────────────────────────
// FIX: Added try-catch + Cloudinary delete
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });

    if (service.publicId) {
      await cloudinary.uploader.destroy(service.publicId);
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
