const express = require("express");
const router = express.Router();

const { askAI } = require("../controllers/chat.controller");

// Public API for customer interactions
router.post("/", askAI);

module.exports = router;
