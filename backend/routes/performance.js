const router = require("express").Router();
const http = require("../utils/http");
const Performance = require("../models/performance");
const { auth } = require("../middlewares/auth");

router.get(
  "/performance",
  /* auth({ block: true }), */ async (req, res) => {
    const performance = await Performance.find()
      .limit(perseInt(req.query.limit))
      .sort({ "venue.date": 1 })
      .exec();
    if (!performance) return res.status(404).json([]);
    res.json({ performance });
  }
);

router.post(
  "/performance",
  /* auth({ block: true }), */ async (req, res) => {
    const [
      title,
      subTitle,
      description,
      author,
      place,
      date,
      time,
      director,
      costumeDesign,
      music,
      choregrapher,
      duration,
      act,
      picture,
      video,
    ] = req.body;
    const performance = Performance.create({
      title: title,
      subTitle: subTitle,
      description: description,
      author: author,
      "venue.place": place,
      "venue.date": date,
      "venue.time": time,
      director: director,
      costumeDesign: costumeDesign,
      music: music,
      choregrapher: choregrapher,
      duration: duration,
      act: act,
      picture: picture,
      video: video,
    });
    if (!performance) return res.status(404).json([]);
    res.json({ performance });
  }
);

module.exports = router;
