const mongoose = require("mongoose");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
  });

  const User = mongoose.model("User", schema);

  return User;
};
