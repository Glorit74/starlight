const mongoose = require("mongoose");

const User = mongoose.model("User", userSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  isConfirmed: { type: Boolean, default: false },
  confirmCode: { type: String, timestamps: true },
  resetCode: { type: String, timestamps: true },
  providers: {
    google: { type: String, sparse: true, unique: true },
    facebook: { type: String, sparse: true, unique: true },
    github: { type: String, sparse: true, unique: true },
  },
  isAdmin: { type: Boolean, default: false },
});

module.exports = User;
