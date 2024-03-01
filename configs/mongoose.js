// Importing mongoose for connecting to mongoDB for DB creation...
const mongoose = require("mongoose");
// Importing environment file  that contains all the variables from .env file.
const env = require("./environment");

// Creating DB  connection using mongoose connect method and passing in URI
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

// Acquiring the  db object from the connection, so we can use
const db = mongoose.connection;

// Detecting error event on the connection...
db.on(
  "error",
  console.error.bind(console, "There's some DB connection error : ")
);


// Detecting  connected event on the connection...
db.once("open", function () {
  console.log("\n Successfully connected to the MongoDB...");
});
