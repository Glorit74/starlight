const User = require("../../models/user");
const jwt = require("jsonwebtoken");

export const login = async (client) => {
  const newUser = new User({
    username: "Macska",
  });
  await newUser.save();
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
  client.set("authorization", token);
};
