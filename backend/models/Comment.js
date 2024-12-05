// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User model
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Link to Post model
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
