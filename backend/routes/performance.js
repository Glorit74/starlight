const router = require("express").Router();
const http = require("../utils/http");
const User = require("../models/user");
const Performance = require("../models/performance");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const performance = await Performance.find().limit(req.query.limit);
  //   .sort({ "venue.date": 1 })
  //   .exec();
  if (!performance) return res.status(404).json([]);
  res.json(performance);
});

router.post("/", auth({ block: true }), async (req, res) => {
  const {
    title,
    subTitle,
    description,
    author,
    director,
    costumeDesign,
    music,
    choregrapher,
    duration,
    act,
    picture,
    video,
  } = req.body;
  const newPf = new Performance({
    title: title,
    subTitle: subTitle,
    author: author,
    description: description,
    director: director,
    costumeDesign: costumeDesign,
    music: music,
    choregrapher: choregrapher,
    duration: duration,
    act: act,
    picture: picture,
    video: video,
  });
  newPf.save();
  if (!newPf) return res.status(404).json([]);
  res.json(newPf);
});

router.post("/venue", auth({ block: true }), async (req, res) => {
  const { title, place, date, time } = req.body;
  const venue = { place: place, date: date, time: time };
  let newPf = await Performance.findOneAndUpdate(
    { title: title },
    { $push: { venue: venue } },
    { upsert: true, new: true }
  );
  res.status(200).json(newPf);
});

router.post("/actor", auth({ block: true }), async (req, res) => {
  const { title, name, role } = req.body;
  const actor = { name: name, role: role };
  let newPf = await Performance.findOneAndUpdate(
    { title: title },
    { $push: { actor: actor } },
    { upsert: true, new: true }
  );
  res.status(200).json(newPf);
});

module.exports = router;
