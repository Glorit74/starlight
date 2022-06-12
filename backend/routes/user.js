const router = require("express").Router();
const jwt = require("jsonwebtoken");
const http = require("../utils/http");
const User = require("../models/user");
const { auth } = require("../middlewares/auth");
const config = require("../app.config");

router.post("/login", auth({ block: false }), async (req, res) => {
  const payload = req.body;
  if (!payload) return res.status(400).send("All inputs are required 1");

  const code = payload.code;
  const provider = payload.provider;
  if (!code || !provider) return res.status(400).send("All inputs required 2");
  if (!Object.keys(config.auth).includes(provider))
    return res.status(400).send("Wrong payload!");
  console.log("43", payload, config.auth[provider]);
  const response = await http.post(
    config.auth[provider].token_endpoint,
    {
      code: code,
      client_id: config.auth[provider].client_id,
      client_secret: config.auth[provider].client_secret,
      redirect_uri: config.auth[provider].redirect_uri,
      grant_type: "authorization_code",
    }
    // {
    //   headers: {
    //     Accept: "application/json",
    //   },
    // }
  );

  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401);

  let openId; //github oauth flow
  const onlyOauth = !response.data.id_token;

  if (onlyOauth) {
    //let token = response.data.split("=")[1].split("&")[0];
    let accessToken = response.data.access_token;
    console.log("accessToken in Github:", accessToken);
    const userResponse = await http.post(
      config.auth[provider].user_endpoint,
      {},
      {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      }
    );
    console.log("data", userResponse?.data);
    if (!userResponse) return res.sendStatus(500);
    if (userResponse.status !== 200) return res.sendStatus(401);

    const id = config.auth[provider].user_id;
    openId = userResponse.data[id];
    console.log(("82 openId", openId));
  } else {
    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);
    openId = decoded.sub;
    console.log("sub", openId);
  }

  const key = `providers.${provider}`;

  let user = await User.findOne({ [key]: openId });

  if (user && res.locals.user?.providers) {
    console.log("provider 71", res.locals.user.providers);
    user.providers = { ...user.providers, ...res.locals.user.providers };
    user = await user.save();
  }
  const sessionToken = jwt.sign(
    {
      userId: user?._id,
      providers: user ? user.providers : { [provider]: openId },
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ sessionToken });

  //create profile, our sessionToken
  router.post("/create", auth({ block: true }), async (req, res) => {
    if (!req.body?.username) return res.sendStatus(400);
    const user = await User.create({
      username: req.body.username,
      providers: res.locals.user.providers,
    });

    const sessionToken = jwt.sign(
      { userId: user._id, providers: user.providers },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // console.log(" create mySessionToken: ", sessionToken);
    res.json({ sessionToken });
  });
});

module.exports = router;
