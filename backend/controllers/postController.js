const Post = require('../models/Post');

// Create a Post
exports.createPost = async (req, res) => {
    const { title, description, content, author,tags, imageUrl } = req.body;

    const post = new Post({
        title,
        description,
        content,
        author,
        views: 0,
        comments: 0,
        tags,
        imageUrl,
    });

    await post.save();
    res.status(201).json(post);
};


// Get All Posts
exports.getAllPosts = async (req, res) => {
    try {
        const { tag } = req.query; // Extract the tag from the query parameters
        
        // Create a filter object based on the tag
        const filter = tag ? { tags: tag } : {}; // Assuming 'tags' is an array in your Post model

        // Fetch posts from the database with optional filtering
        const posts = await Post.find(filter).populate('author', 'username'); // Populate author with username

        res.json(posts); // Return the fetched posts
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error, please try again later.' }); // Send an error response
    }
};


// Get a Single Post
exports.getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
};

// Update a Post
exports.updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
};
// Increment views
exports.incrementViews = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
};

// Delete a Post
exports.deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
};


