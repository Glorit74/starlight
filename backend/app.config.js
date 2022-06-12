const config = {
  auth: {
    google: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      token_endpoint: "https://oauth2.googleapis.com/token",
      grant_type: "authorization_code",
      user_endpoint: null,
      user_id: null,
    },
    // github: {
    //   client_id: process.env.GITHUB_CLIENT_ID,
    //   client_secret: process.env.GITHUB_CLIENT_SECRET,
    //   redirect_uri: process.env.GITHUB_REDIRECT_URI,
    //   token_endpoint: "https://github.com/login/oauth/access_token",
    //   grant_type: "authorization_code",
    //   user_endpoint: "http://api.github.com/user",
    //   user_id: "id",
    // },
    /*   facebook: {
    client_id: "",
    redirect_uri: "",
	state={"{st=state123abc,ds=123456789}"},
    tokenEndpoint: "",
  }, */
  },
};

module.exports = config;
