const Enquiry = require("../models/enquiry.model");
const sendEmail = require("../utils/email");

// ── CREATE ENQUIRY (Public) ───────────────────────────────────────────────
exports.createEnquiry = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const enquiry = await Enquiry.create({ name, phone, message });
    
    // 🔥 EMAIL SEND
    await sendEmail({ name, phone, message });

    res.status(201).json({ success: true, message: "Enquiry submitted", data: enquiry });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET ALL ENQUIRIES (Admin) ─────────────────────────────────────────────
// FIX: Added try-catch — missing before, server would crash on DB error
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE ENQUIRY (Admin) ────────────────────────────────────────────────
exports.deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
