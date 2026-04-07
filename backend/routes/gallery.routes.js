const express = require("express");
const router  = express.Router();

const { uploadMedia, getGallery, deleteMedia } = require("../controllers/gallery.controller");
const protect = require("../middleware/auth.middleware");
const upload  = require("../middleware/upload.middleware");

// Public — website reads gallery (supports ?category=marble filter)
router.get("/", getGallery);

// Admin — upload new media
router.post("/upload", protect, upload.single("file"), uploadMedia);

// Admin — delete (removes from DB + Cloudinary)
router.delete("/:id", protect, deleteMedia);

module.exports = router;
