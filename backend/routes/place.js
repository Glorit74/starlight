const router = require("express").Router();
const auth = require("../middlewares/auth");
const Place = require("../models/place");

router.post("/", async (req, res) => {
  const {
    name,
    post_code,
    city,
    street,
    email,
    phone,
    mobile,
    website,
    picture,
    description,
    isParking,
  } = req.body;
  if (!name) return res.status(400).json("Hiányzik adat (elnevezés)");
  const address = { post_code: post_code, city: city, street: street };
  const newPlace = await Place.create({
    name: name,
    address: address,
    email: email,
    phone: phone,
    mobile: mobile,
    website: website,
  });
  if (!newPlace) return res.sendStatus(500);
  res.status(200).json(newPlace);
});

router.get("/", async (req, res) => {
  const place = await Place.find({}).sort("name");
  if (!place) return res.status(404).json("Nincs ilyen elmentett hely");
  res.status(200).json(place);
});

module.exports = router;
