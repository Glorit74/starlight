const jwt = require("jsonwebtoken");

exports.auth =
  ({ block }) =>
  (req, res, next) => {
    const token = req.header("authorization");
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error && block) {
        console.log("auth error: ", error);
        return res.sendStatus(401);
      }

      res.locals.user = user;
      next();
    });
  };
