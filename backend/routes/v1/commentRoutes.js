const express = require('express');
const { createComment, getCommentsByPostId } = require('../../controllers/commentController');
const authMiddleware = require('../../middleware/authMiddleware'); // Ensure the user is authenticated
const router = express.Router();

router.use(authMiddleware); // Protect all routes with authentication

// POST /api/v1/comments/:postId - Create a new comment
router.post('/:postId', createComment);

// GET /api/v1/comments/:postId - Get all comments for a specific post
router.get('/:postId', getCommentsByPostId);

module.exports = router;
