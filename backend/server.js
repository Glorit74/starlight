require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT;

mongoose.connect(process.env.CONNECTION_STRING);
mongoose.connection.once("open", function () {
  console.log(
    `MongoDB database connection established successfully to ${mongoose.connection.db.databaseName}DB`
  );
});

app.listen(port, () => {
  console.log(`Starlight app listening on port ${port}`);
});
