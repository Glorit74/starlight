const mongoose = require("mongoose");

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
    //sparce azért kell, mert így nem probléma, ha több provider nincs és így több nulla is van, ami nem lehet unique
  },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
