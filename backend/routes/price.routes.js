const express = require("express");
const router  = express.Router();

const {
  getPrices,
  addPrice,
  updatePrice,
  deletePrice,
  uploadPricePDF,
} = require("../controllers/price.controller");

const protect = require("../middleware/auth.middleware");
const upload  = require("../middleware/upload.middleware");

// Public — website reads prices
router.get("/", getPrices);

// Admin — manual CRUD
router.post("/",        protect, addPrice);
router.put("/:id",      protect, updatePrice);
router.delete("/:id",   protect, deletePrice);

// Admin — PDF auto-update
router.post("/upload-pdf", protect, upload.single("file"), uploadPricePDF);

module.exports = router;
