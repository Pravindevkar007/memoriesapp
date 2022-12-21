const dbConfig = require("../config/db.config");
// import mongoose from "mongoose";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.url = dbConfig.url;

db.posts = require("./socialpost.model")(mongoose);
db.user = require("./user.model")(mongoose);

module.exports = db;
