const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
// const path = require("path");
const db = require("./configs/mongoose");

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

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
