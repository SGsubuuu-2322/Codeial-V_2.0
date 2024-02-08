const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Codeial_Development");

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "There's some DB connection error : ")
);

db.once("open", function () {
  console.log("Successfully connected to the MongoDB...");
});
