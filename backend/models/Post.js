const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true }, // You may want to link this to a user model
  date: { type: Date, default: Date.now },
});

// Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: { type: [String], required: true }, 
  date: { type: Date, default: Date.now }, 
  views: { type: Number, default: 0 }, 
  comments: { type: Number, default: 0 }, // Count of comments
  commentList: [commentSchema], // Array of comments
});

// Export the Post model
module.exports = mongoose.model('Post', postSchema);
