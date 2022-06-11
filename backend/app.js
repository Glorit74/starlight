const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
// const auth = require("./middlewares/auth");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
  })
);
app.use(express.json());

app.use(morgan(":method :url :status - :response-time ms"));

app.use("/api/user", userRoutes);

app.use(errorHandler);

module.exports = app;
