const express = require("express");
const {
  VerifyOtpController,
  LoginController,
  RegitserController,
} = require("../controllers/authControllers");
const {
  getAllContacts,
  createContact,
} = require("../controllers/contactsController");
const { getAllUsers } = require("../controllers/userControllers");
const {
  sendMessage,
  reciveMessage,
  loadMessage,
} = require("../controllers/messageControllers");
const router = express.Router();

// Auth Routes
router.post("/auth/verify-otp", VerifyOtpController);
router.post("/auth/login", LoginController);
router.post("/auth/register", RegitserController);
router.get("/user/get-user-contacts/:id", getAllContacts);
router.post("/user/create-user-contact", createContact);
router.post("/user/get-all-users", getAllUsers);
router.post("/user/send-message", sendMessage);
router.post("/user/recieve-message", reciveMessage);
router.post("/load-model", loadMessage);
module.exports = router;
