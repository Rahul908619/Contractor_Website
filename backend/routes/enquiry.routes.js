const express = require("express");
const router = express.Router();

const {
  createEnquiry,
  getEnquiries,
  deleteEnquiry
} = require("../controllers/enquiry.controller");

const protect = require("../middleware/auth.middleware");

// public
router.post("/", createEnquiry);

// admin
router.get("/", protect, getEnquiries);
router.delete("/:id", protect, deleteEnquiry);

module.exports = router;
