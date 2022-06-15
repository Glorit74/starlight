const jwt = require("jsonwebtoken");

const auth =
  ({ block }) =>
  (req, res, next) => {
    const token = req.header("authorization");
    console.log("auth token: ", token);
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error && block) {
        console.log("auth error: ", error);
        return res.sendStatus(401);
      }

      res.locals.user = user;
      next();
    });
  };

module.exports = auth;
