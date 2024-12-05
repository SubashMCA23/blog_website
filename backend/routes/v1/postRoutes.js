const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost, incrementViews } = require('../../controllers/postController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/increment-views', incrementViews);


module.exports = router;
