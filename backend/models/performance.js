const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  awards: {
    title: String,
    year: String,
  },
  picture: String,
  roles: [String],
});

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: String,
  author: String,
  date: Date,
  media: String,
  article: String,
  link: String,
});

const performanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: String,
  description: String,
  author: String,
  actor: [actorSchema],
  venue: [
    {
      place: String,
      date: Date,
      time: String,
    },
  ],
  director: String,
  costumeDesign: String,
  music: String,
  choregrapher: String,
  duration: Number,
  act: Number,
  picture: String,
  video: String,
  news: [newsSchema],
});

const Performance = mongoose.model("Performance", performanceSchema);

module.exports = Performance;
