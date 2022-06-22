const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    post_code: { type: Number, minLength: 4, maxLength: 4 },
    city: { type: String, required: true },
    street: String,
  },
  email: String,
  phone: String,
  mobile: String,
  website: String,
  picture: String,
  description: String,
  isParking: Boolean,
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
