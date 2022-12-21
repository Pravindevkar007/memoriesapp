module.exports = (app) => {
  const { auth } = require("../middleware/auth");
  const posts = require("../controllers/socialpost.controller");

  var router = require("express").Router();

  router.get("/getposts", posts.getPosts);
  router.get("/getpost/:id", posts.getPost);
  router.get("/posts/search", posts.getPostsBySearch);
  router.post("/createpost", auth, posts.create);
  router.patch("/updatepost/:id", auth, posts.updatePost);
  router.delete("/deletepost/:id", auth, posts.deletePost);
  router.patch("/likepost/:id", auth, posts.likePost);

  app.use("/v1/api", router);
};
