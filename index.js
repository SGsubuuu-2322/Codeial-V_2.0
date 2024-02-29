// Importing express framework for creating server and its logical operations smoothly on top of Node JS. ....
const express = require("express");
// Importing environment file for accessing environment variables...
const env = require("./configs/environment");
// Importing  cookie-parser to parse payloads from request cookies  into JSON object...
const cookieParser = require("cookie-parser");
// Creating an instance of the express app, and defining  a port number to run on.
const app = express();
const port = 8000;

// Importing express-ejs-layouts for creating layout for our web-app...
const expressLayouts = require("express-ejs-layouts");
// Importing path  module to resolve paths for varoius files from various folders...
const path = require("path");

// Importing the mongoDB connection in our entry-point file...
const db = require("./configs/mongoose");

// Importing express-session for handling and creating sesssions and its data...
const session = require("express-session");

// Importing passport library and its configured strategies for handling authentication and authorisation...
const passport = require("passport");
const passportLocal = require("./configs/passport_local_strategy");
const passportJWT = require("./configs/passport-jwt-strategy");
const passportGoogleStrategy = require("./configs/passport-google-oauth-strategy");

// Importing connect-mongo as  the MongoDB store for Express Session middleware for storing session data...
const MongoStore = require("connect-mongo");

// Importing node-sass-middleware  for compiling sass to css at runtime...
const sassMiddleware = require("node-sass-middleware");

// Importing connect-flash and configured customWare for  flash messages functionality...
const flash = require("connect-flash");
const customMware = require("./configs/middleware");

// Importing http module and  using it to create HTTP server that listens on specified port for our chatserver...
const chatServer = require("http").Server(app);
const chatSockets = require("./configs/chat_sockets").chatSocket(chatServer);
chatServer.listen(5000);
console.log("Chating Server is listening on port: 5000");


// Creating custom middleware for setting up node-sass-middleware as for using scss technology  in stylesheets..
app.use(
  sassMiddleware({
    src: path.join(__dirname, env.assets_path, "/scss"),
    dest: path.join(__dirname, env.assets_path, "/css"),
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.assets_path));
app.use("/uploads", express.static(__dirname + "/uploads"));

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
    secret: env.session_cookie_key,
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
