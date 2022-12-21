module.exports = (app) => {
  const users = require("../controllers/users.controller");
  const { auth } = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/signin", users.signin);
  router.post("/signup", users.signup);

  app.use("/v1/api", router);
};
