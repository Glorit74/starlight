const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, maxLength: 30 },
  address: {
    zip: { type: Number, min: 1000, max: 9999 },
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
