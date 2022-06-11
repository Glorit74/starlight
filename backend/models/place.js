const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    country_code: String,
    post_code: String,
    city: String,
    address: String,
  },
  emails: String,
  phone: String,
  mobile: String,
  website: String,
  picture: String,
  description: String,
  parking: String,
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
