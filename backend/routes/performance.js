const router = require("express").Router();
const http = require("../utils/http");
const User = require("../models/user");
const Performance = require("../models/performance");
const auth = require("../middlewares/auth");
const { Error } = require("mongoose");

router.get("/", async (req, res) => {
  const performance = await Performance.find({}).sort({
    title: "asc",
  });
  // .exec();

  if (!performance) return res.status(404).json([]);
  res.json(performance);
});

router.post("/", auth({ block: true }), async (req, res) => {
  const resp = req.body;
  //   console.log(res.body, "resp");
  let newPf;
  if (!resp.title) return res.status(404).json("Cím kötelező");
  const existedPf = await Performance.findOne({ title: resp.title });
  if (!existedPf) {
    newPf = await Performance.create(resp);
  } else {
    newPf = await Performance.findOneAndUpdate(
      { title: resp.title },
      {
        subTitle: resp.subTitle,
        description: resp.description,
        author: resp.author,
        director: resp.director,
        music: resp.music,
        choregrapher: resp.choregrapher,
        duration: resp.duration,
        act: resp.act,
        picture: resp.picture,
        video: resp.video,
      },
      { new: true }
    );
  }
  if (!newPf) return res.status(500).json([]);
  res.status(200).json(newPf);
});

router.post("/venue", auth({ block: true }), async (req, res) => {
  if (!req.body.title)
    return res.status(400).json("Létező előadáshoz lehet helyszínt rögzíteni");

  let venue = {
    place: req.body.place,
    date: req.body.date,
    time: req.body.time,
  };
  let existingVenue = await Performance.findOne({
    "venue.place": req.body.place,
    "venue.date": req.body.date,
    "venue.time": req.body.time,
  });
  let newPf;
  if (!existingVenue) {
    newPf = await Performance.findOneAndUpdate(
      { title: req.body.title },
      { $push: { venue: venue } },
      { new: true }
    );
    console.log("új", newPf);
  } else res.status(400).json("Rögzített esemény");
  res.status(200).json(newPf);
});

router.post("/actor", auth({ block: true }), async (req, res) => {
  const { title, name, role } = req.body;
  if (!title || !name || !role) return res.status(400).json("Adat hiányzik");
  const existingActor = await Performance.findOne({
    title: title,
    "actor.name": name,
    "actor.role": role,
  });
  let newPf;
  if (existingActor) return res.status(400).json("Rögzített szerep");
  else {
    const actor = { name: name, role: role };
    newPf = await Performance.findOneAndUpdate(
      { title: title },
      { $push: { actor: actor } },
      { new: true }
    );
  }
  res.status(200).json(newPf);
});

router.post("/actor/modify", auth({ block: true }), async (req, res) => {
  const { name, role, actorId } = req.body;
  if (!actorId) return res.status(400).json("Adat hiányzik");

  const Pf = await Performance.findOne({ "actor._id": actorId }, "actor");
  Pf.actor.map((p) => {
    if (p._id == actorId) {
      p.role = role;
      p.name = name;
    }
  });
  await Pf.save();
  if (!Pf) return res.status(500).json("Hiba");
  res.status(200).json(Pf);
});

router.post("/actor/delete", auth({ block: true }), async (req, res) => {
  const { performanceId, actorId } = req.body;

  const pf = await Performance.findOneAndUpdate(
    { _id: performanceId },
    {
      $pull: {
        actor: { _id: actorId },
      },
    },
    { new: true }
  )
    .then((pf) => {
      console.log(pf);
      res.status(200).json(pf);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

module.exports = router;
