const express = require("express");
const {
  VerifyOtpController,
  LoginController,
  RegitserController,
} = require("../controllers/authControllers");
const router = express.Router();

// Auth Routes
router.post("/auth/verify-otp", VerifyOtpController);
router.post("/auth/login", LoginController);
router.post("/auth/register", RegitserController);

module.exports = router;
