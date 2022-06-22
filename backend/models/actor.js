const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  awards: [
    {
      title: String,
      year: String,
    },
  ],
  picture: String,
  roles: [
    {
      title: String,
      role: String,
    },
  ],
  isActive: { type: Boolean, default: true },
});

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
module.exports.actorSchema = actorSchema;
