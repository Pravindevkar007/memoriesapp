const express = require("express");

const app = express();
var cors = require("cors");
app.use(cors());
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./app/models");
const { MongoClient, ServerApiVersion } = require("mongodb");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(() => {
    console.log("connected to Database successfully !!!");
  })
  .catch(() => {
    console.log("Failed to connect database !!!");
    process.exit();
  });

  // const { MongoClient, ServerApiVersion } = require("mongodb");
  // const uri =
  //   "mongodb+srv://Pravindevkar007:vJkBiwoSobKVbvAK@cluster0.xmbkede.mongodb.net/?retryWrites=true&w=majority";
  // const client = new MongoClient(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   serverApi: ServerApiVersion.v1,
  // });
  // client.connect((err) => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   console.log(err);
  //   client.close();
  // });





require("./app/routes/socialpost.routes")(app);
require("./app/routes/users.routes")(app);
app.listen(8008, () => {
  console.log(`Server listening on port 8008`);
});

// app.get("/check", (req, res) => {
//   // res.send("This works");
//   res.json({ message: "Welcome to the express js with mongodb " });
// });
