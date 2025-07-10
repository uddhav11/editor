// models/pendingVerificationModel.js
const mongoose = require("mongoose");

const pendingVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: String,
  password: String, // hashed password
  userCode: String,
  otp: { type: String, required: true },
  type: { type: String, enum: ["register", "login"], required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // Document auto-deletes after 5 minutes
  },
});

module.exports = mongoose.model(
  "PendingVerification",
  pendingVerificationSchema
);
