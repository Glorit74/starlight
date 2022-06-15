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

    facebook: {
      client_id: process.env.FACEBOOK_CLIENT_ID,
      client_secret: process.env.FACEBOOK_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/auth/facebook/callback",
      tokenEndpoint: "https://graph.facebook.com/v14.0/oauth/access_token",
      grant_type: "authorization_code",
      use_database: false,
      host: "localhost",
      username: "root",
      password: "",
      database: "Starlight",
    },
  },
};

module.exports = config;
