const router = require("express").Router();
const http = require("../utils/http");
const auth = require("../middlewares/auth");
const User = require("../models/user");
const Actor = require("../models/actor");

router.get("/", async (req, res) => {
  const actor = await Actor.find({}, "name -_id");
  if (!actor) return res.status(404).json([]);
  res.status(200).json(actor);
});

router.get("/title", async (req, res) => {
  const title = req.body.title;
  console.log(title);
  if (!title)
    return res.status(400).json("Ilyen című alőadás még nincs rögzítve");

  const actor = await Actor.find(
    {
      "roles.title": new RegExp(`^${req.body.title}`, "i"),
      // new RegExp(`^${req.query.title}`, "i")
    },

    "name -_id"
  );

  //   const actor = Actor.find({
  //     "roles.title": new RegExp(`^${req.query.title}`, "i"),
  //   });

  if (!actor) return res.status(404).json([]);
  res.status(200).json(actor);
});

router.post("/", async (req, res) => {
  const { name, description, picture } = req.body;
  if (!name) return res.status(400).json("Név megadása szükséges");
  const newActor = await Actor.create({
    name: name,
    description: description,
    picture: picture,
  });
  if (!newActor) return res.status(400).json([]);
  res.status(200).json(newActor);
});

router.post("/awards", async (req, res) => {
  const { name, title, year } = req.body;
  const award = { title: title, year: year };
  let newActor = await Actor.findOneAndUpdate(
    { name: name },
    { $push: { awards: award } }
    // { upsert: true, new: true }
  );

  res.status(200).json(newActor);
});

router.post("/role", async (req, res) => {
  const { actor, title, role } = req.body;
  const newRole = { title: title, role: role };
  let newActor = await Actor.findOneAndUpdate(
    { name: actor },
    { $push: { roles: newRole } },
    { upsert: true, new: true }
  );
  res.status(200).json(newActor);
});

module.exports = router;
