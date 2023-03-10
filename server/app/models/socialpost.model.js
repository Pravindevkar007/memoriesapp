const mongoose = require("mongoose");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    title: String,
    message: String,
    name : String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  });

  const Posts = mongoose.model("PostMessage", schema);

  return Posts;
};
