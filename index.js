const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
// const path = require("path");
const db = require("./configs/mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./configs/passport_local_strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./configs/middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.set("views", "./views");

app.use(
  session({
    name: "Codeial-V_2.0",
    // TODO : Change the secret key before deployment on the production server...
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/Codeial_Development",
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err || "Connect-mongo setup Ok...");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`There's some error in starting your server: ${err}`);
    return;
  }

  console.log(`Your server is successfully running on port: ${port}`);
});
