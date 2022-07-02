const router = require("express").Router();
const auth = require("../middlewares/auth");
const { findById } = require("../models/place");
const Place = require("../models/place");

router.post("/", auth({ block: true }), async (req, res) => {
  const {
    id,
    name,
    shortName,
    zip,
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
  if (shortName?.Length > 31)
    return res.status(400).json("Max 30 karakter lehet a rövidnév");
  if (zip < 1000 || zip > 9999)
    res.status(400).json("Nem létezik ilyen irányítószám");
  const address = { zip: zip, city: city, street: street };
  const place = await Place.findOne({ _id: id });
  if (!place) {
    const newPlace = await Place.create({
      name: name,
      shortName: shortName,
      address: address,
      email: email,
      phone: phone,
      mobile: mobile,
      website: website,
      picture: picture,
      description: description,
      isParking: isParking,
    });
    if (!newPlace) return res.status(500).json("Adatbázis hiba");
  }
  if (id) {
    const existingPlace = await Place.findOneAndUpdate(
      { id: id },
      {
        name: name,
        shortName: shortName,
        "address.zip": zip,
        "address.city": city,
        "address.street": street,
        email: email,
        phone: phone,
        mobile: mobile,
        website: website,
      }
    );
    // console.log(existingPlace);
  }
  const allPlace = await Place.find({});
  res.status(200).json(allPlace);
});

router.get("/", async (req, res) => {
  const place = await Place.find({}).sort("name");
  if (!place) return res.status(404).json("Nincs ilyen elmentett hely");
  res.status(200).json(place);
});

module.exports = router;
