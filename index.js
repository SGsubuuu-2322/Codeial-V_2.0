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

// Setting up urlencoded() and cookie parser  middlewares for parsing request bodies and cookies from incoming requests
app.use(express.urlencoded());
app.use(cookieParser());

// Setting up the static  file serving from public directory...
app.use(express.static(env.assets_path));
app.use("/uploads", express.static(__dirname + "/uploads"));


// Setting up express-layouts and its scripts and stylings..
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Adding  the view engine with ejs templates and passing in any necessary locals (e.g., global
app.set("view engine", "ejs");
app.set("views", "./views");


// Setting up or configuring express-session for session  handling...
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

// Initializing the  passport middleware to handle authentication requests and sessions...
app.use(passport.initialize());
app.use(passport.session());

// using custom middleware for setting authenticated user from req body to res locals...
app.use(passport.setAuthenticatedUser);

// Setting up custom middleware and initializing flash messages for sending flash notifications from server...
app.use(flash());
app.use(customMware.setFlash);

// Settign routes folder for handling routes...
app.use("/", require("./routes"));


// Making our server to listen  on port specified in .env file...
app.listen(port, (err) => {
  if (err) {
    console.log(`There's some error in starting your server: ${err}`);
    return;
  }

  console.log(`Your server is successfully running on port: ${port}`);
});
