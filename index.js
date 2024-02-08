const express = require("express");
const port = 8000;

const app = express();

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`There's some error in starting your server: ${err}`);
    return;
  }

  console.log(`Your server is successfully running on port: ${port}`);
});
