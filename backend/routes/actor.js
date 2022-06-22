const router = require("express").Router();
const http = require("../utils/http");
const auth = require("../middlewares/auth");
const User = require("../models/user");
const Actor = require("../models/actor");
const { findOne, replaceOne } = require("../models/user");

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
  const { name, description, picture, id } = req.body;
  if (!name) return res.status(400).json("Név megadása szükséges");
  let newActor;

  const actor = await Actor.findOne({ name: name });
  if (!actor) {
    newActor = await Actor.create({
      name: name,
      description: description,
      picture: picture,
    });
  } else if (actor && !id)
    return res.status(400).json("Több azonos nevű színész, id!!");
  else {
    newActor = await Actor.findOneAndUpdate(
      {
        id: id,
        name: name,
      },
      { description: description, picture: picture },
      { new: true }
    );
  }
  if (!newActor) return res.status(500).json([]);
  res.status(200).json(newActor);
});

router.post("/awards", async (req, res) => {
  const { name, title, year, id } = req.body;
  const award = { title: title, year: year };

  const actor = await Actor.findById(id);
  if (!actor) {
    newActorAward = await Actor.create({
      name: name,
      awards: award,
    });
  } else {
    const existingAward = await Actor.find({
      _id: id,
      name: name,
      "awards.title": title,
      "awards.year": year,
    });

    if (!existingAward.length) {
      actor.awards.push(award);
      await actor.save();
      res.status(200).json(actor);
    } else return res.status(400).json(existingAward);
  }
});

router.post("/role", async (req, res) => {
  const { name, title, role, id } = req.body;
  const newRole = { title: title, role: role };
  // only in DB existed actor can have roles
  if (!id) return res.status(400).json([]);

  const actor = await Actor.findById(id);

  if (!actor) return res.status(400).json([]);

  const existingRole = await Actor.find({
    _id: id,
    name: name,
    "roles.title": title,
    "roles.role": role,
    // in one pf can be more roles
  });
  if (!existingRole.length) {
    actor.roles.push(newRole);
    await actor.save();
    res.status(200).json(actor);
  } else return res.status(400).json(existingRole);
});

router.delete("/delete/:id", async (req, res) => {
  console.log(req.params);
  //   res.send("Got a DELETE request at /user");
  Actor.findOneAndDelete({
    _id: req.params.id,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.delete("/role/delete", async (req, res) => {
  const { actorId, roleId, role } = req.body;

  //   const actor = Actor.find(
  //     { "roles.role": role },
  //     { roles: { $elemMatch: { role: role } } }
  //   );

  //   console.log(actor?._conditions);
  const actor = await Actor.findOneAndUpdate(
    { _id: actorId },
    {
      $pull: {
        roles: { _id: roleId },
      },
    },
    { new: true }
    // function (err, doc) {
    //   if (err) return res.status(400).json({ success: false, err });
    //   res.status(200).json({ success: true, doc });
    // }
  )
    .then((role) => console.log(role, "maradék szerep"))
    .catch((err) => console.log(err));

  res.sendStatus(200);
  //   .json(actor);
});

module.exports = router;
