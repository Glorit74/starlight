const express = require("express");
require("express-async-errors");
const cors = require("cors");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

const morgan = require("morgan");
const userRoutes = require("./routes/user");
const userPerformance = require("./routes/performance");

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
  })
);
app.use(express.json());

app.use(morgan(":method :url :status - :response-time ms"));

app.get("/api/public", (req, res) => {
  console.log("public");
  res.send("Hello Public World ! ");
});
app.get("/api/private", auth({ block: true }), (req, res) => {
  console.log("private");
  res.send(`Hello Private world, your user id is: ${res.locals.user.userId} !`);
});

app.use("/api/user", userRoutes);
app.use("/api/performance", userPerformance);

// app.use(errorHandler);

module.exports = app;
