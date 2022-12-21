// import db from '../models'
const db = require("../models");
const Posts = db.posts;
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  const post = req.body;
  const newPost = new Posts({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //get starting index if every page
    const total = await Posts.countDocuments({});
    const posts = await Posts.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await Posts.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post with that Id");
    }
    const updatedPost = await Posts.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that Id");
    }
    await Posts.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that Id");
    }
    const post = await Posts.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id != String(req.userId));
    }

    const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
