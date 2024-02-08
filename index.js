const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
// const path = require("path");

app.use(express.static("./assets"));

app.use(expressLayouts);
app.use("/", require("./routes"));

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.set("views", "./views");

app.listen(port, (err) => {
  if (err) {
    console.log(`There's some error in starting your server: ${err}`);
    return;
  }

  console.log(`Your server is successfully running on port: ${port}`);
});
