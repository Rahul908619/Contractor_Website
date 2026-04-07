const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/auth.controller");

// create admin (one time)
router.post("/register", registerAdmin);

// login
router.post("/login", loginAdmin);

module.exports = router;
