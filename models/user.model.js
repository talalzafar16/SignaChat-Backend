const mongoose = require("mongoose");

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: String,
  number: Number,
  image: String,
  gender: String,
  otp: Number,
  verified: Boolean,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
