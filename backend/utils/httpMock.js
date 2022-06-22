const { _instance } = require("./http");
const axiosMockAdapter = require("axios-mock-adapter");
const jwt = require("jsonwebtoken");

const mock = new axiosMockAdapter(_instance);

const setupGoogleSuccessResponse = (sub) => {
  const jwtToken = jwt.sign({ sub }, "fakeSecret");
  mock
    .onPost("https://oauth2.googleapis.com/token")
    .replyOnce(200, { id_token: jwtToken });
};

const setupGoogleErrorResponse = () => {
  mock.onPost("https://oauth2.googleapis.com/token").replyOnce(401);
};
module.exports = { setupGoogleSuccessResponse, setupGoogleErrorResponse };
