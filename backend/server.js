const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/v1/authRoutes');
const postRoutes = require('./routes/v1/postRoutes');
const commentRoutes = require('./routes/v1/commentRoutes');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes); // Corrected line

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
