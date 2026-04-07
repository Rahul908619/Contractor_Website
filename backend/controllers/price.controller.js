const pdfParse = require("pdf-parse");
const Price    = require("../models/price.model");

// ── GET all prices (public — website reads this) ──────────────────────────
exports.getPrices = async (req, res) => {
  try {
    const prices = await Price.find().sort({ category: 1, name: 1 });

    // Group by category for easy frontend rendering
    const grouped = prices.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    res.json({ success: true, data: prices, grouped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── POST add price manually (admin) ──────────────────────────────────────
exports.addPrice = async (req, res) => {
  try {
    const { category, name, price, unit } = req.body;
    if (!category || !name) {
      return res.status(400).json({ success: false, message: "Category and name are required" });
    }
    const item = await Price.create({ category, name, price: price || null, unit: unit || "sq ft", fromPdf: false });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── PUT update price manually (admin) ─────────────────────────────────────
exports.updatePrice = async (req, res) => {
  try {
    const item = await Price.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fromPdf: false, updatedAt: new Date() },
      { new: true }
    );
    if (!item) return res.status(404).json({ success: false, message: "Price item not found" });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE price item (admin) ─────────────────────────────────────────────
exports.deletePrice = async (req, res) => {
  try {
    await Price.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── POST upload PDF contract → auto-extract prices ────────────────────────
exports.uploadPricePDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "PDF file required" });

    const data = await pdfParse(req.file.buffer);
    const text = data.text;
    const lines = text.split("\n");

    const updated = [];
    const added   = [];
    const skipped = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // FIX: More specific regex — looks for ₹ or Rs followed by number
      // Matches: "Italian Carrara ₹185" or "Marble Flooring Rs 95/sq ft"
      const match = trimmed.match(/^(.+?)\s+(?:₹|Rs\.?)\s*(\d+(?:\.\d+)?)/i);
      if (!match) { skipped.push(trimmed); continue; }

      const name  = match[1].trim();
      const price = parseFloat(match[2]);

      if (!name || isNaN(price) || price <= 0) { skipped.push(trimmed); continue; }

      // Try to find existing item by name (case-insensitive)
      const existing = await Price.findOne({ name: new RegExp(`^${name}$`, "i") });

      if (existing) {
        await Price.findByIdAndUpdate(existing._id, { price, fromPdf: true });
        updated.push({ name, price });
      } else {
        // Auto-create new price item from PDF
        const newItem = await Price.create({ category: "Uncategorised", name, price, fromPdf: true });
        added.push({ name, price });
      }
    }

    res.json({
      success: true,
      message: `PDF processed: ${updated.length} updated, ${added.length} new items added`,
      updated,
      added,
      skippedLines: skipped.length,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
