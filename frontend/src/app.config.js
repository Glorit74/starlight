const _config = {
  dev: {
    todoAPI: "http://localhost:4001/api",
    google_client_id:
      "806136419820-ne2p17i3tjap5h3rc1r6a0gf88sm3gjm.apps.googleusercontent.com",
    google_base_url: "",
  },
  prod: {
    todoAPI: process.env.REACT_APP_TODOAPI || "http://mydomain.hu/api",
    google_client_id:
      process.env.REACT_APP_GOOGLE_CLIENT_ID ||
      "806136419820-ne2p17i3tjap5h3rc1r6a0gf88sm3gjm.apps.googleusercontent.com",
    google_base_url: "https://accounts.google.com/o/oauth2/v2/auth",
  },
};
const config =
  process.env.NODE_ENV === "development" ? _config.dev : _config.prod;

export default config;
