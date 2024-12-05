// controllers/commentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Create a new comment
exports.createComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params; // Get the post ID from the route parameters

  // Ensure the user is authenticated
  if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  const userId = req.user._id; // Get user ID from the authenticated user

  // Validate input
  if (!content || typeof content !== 'string') {
      return res.status(400).json({ message: 'Comment content is required and must be a string.' });
  }

  try {
      const comment = new Comment({
          content,
          authorId: userId, // Associate the comment with the user
          post: postId,    // Associate the comment with the post
      });

      await comment.save();

      // Increment the comment count in the associated post
      await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } });

      res.status(201).json(comment); // Return the created comment
  } catch (error) {
      console.error('Error creating comment:', error); // Log the error for debugging
      res.status(500).json({ message: 'Failed to create comment. Please try again.' });
  }
};


// Get all comments for a specific post
// Get all comments for a specific post
exports.getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
      return res.status(400).json({ message: 'Post ID is required.' });
  }

  try {
      const comments = await Comment.find({ post: postId }).populate('authorId', 'username'); // Populate author field with username
      console.log(comments); // Debugging: log the retrieved comments
      res.status(200).json(comments); // Return the list of comments with 200 status
  } catch (error) {
      console.error("Error fetching comments:", error); // Log the error for debugging
      res.status(500).json({ message: 'Failed to fetch comments.', error: error.message }); // Include error message in response
  }
};
