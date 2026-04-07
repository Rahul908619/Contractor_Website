const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  deleteService,
} = require("../controllers/service.controller");

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.post("/", protect, upload.single("file"), createService);
router.get("/", getServices);
router.delete("/:id", protect, deleteService);

module.exports = router;
