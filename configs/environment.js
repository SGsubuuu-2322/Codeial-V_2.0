const production = {
  name: "production",
};
const development = {
  name: "development",
  assets_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "Codeial_Development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pradhansubham2322@gmail.com",
      pass: "uqjc fgch erap enra",
    },
  },
  google_client_id:
    "498113812873-o7r7rsf0va92h3pbt5grhgtdlq605btm.apps.googleusercontent.com",
  google_client_secret: "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",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret_key: "Codeial",
};

module.exports = development;
