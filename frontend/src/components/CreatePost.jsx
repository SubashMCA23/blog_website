import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tagsArray = tags.split(',').map((tag) => tag.trim());

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/posts`,
        {
          title,
          description,
          content,
          author,
          tags: tagsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('Post created successfully!');
      setTitle('');
      setDescription('');
      setContent('');
      setTags('');
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8 px-4 bg-[#f2e7dc]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[600px]">
        <div className="flex items-center mb-8">
          <button
            onClick={handleGoBack}
            className="text-xl text-gray-600 hover:text-black mr-4"
          >
            ← 
          </button>
          <h2 className="text-4xl font-bold text-center text-black flex-grow">Create a New Post</h2>
        </div>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            required
          />
          <input
            type="text"
            placeholder="Author"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Tags (comma-separated) E.g. Gen-AI, Data Science, ML, UI-UX"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`bg-black text-white py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition w-full ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
