const express = require("express");

const app = express();
var cors = require("cors");
app.use(cors());
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./app/models");

db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to Database successfully !!!");
  })
  .catch(() => {
    console.log("Failed to connect database !!!");
    process.exit();
  });

require("./app/routes/socialpost.routes")(app);
require("./app/routes/users.routes")(app);
app.listen(8008, () => {
  console.log(`Server listening on port 8008`);
});

// app.get("/check", (req, res) => {
//   // res.send("This works");
//   res.json({ message: "Welcome to the express js with mongodb " });
// });
