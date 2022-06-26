const express = require("express");
require("express-async-errors");
const cors = require("cors");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

const morgan = require("morgan");

const userRoutes = require("./routes/user");
const performanceRoutes = require("./routes/performance");
const actorRoutes = require("./routes/actor");
const placeRoutes = require("./routes/place");

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
  })
);
app.use(express.json());

// app.use(morgan(":method :url :status - :response-time ms"));

app.use("/api/user", userRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/actor", actorRoutes);
app.use("/api/place", placeRoutes);
// app.use(errorHandler);

module.exports = app;
