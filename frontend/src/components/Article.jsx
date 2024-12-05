import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Loading from "./Loading";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Article = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found.');
        }

        // Increment views
        await axios.put(`${API_BASE_URL}/api/posts/${id}/increment-views`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Fetch the article details
        const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setArticle(response.data);
        setFormData({ title: response.data.title, content: response.data.content });

        // Fetch comments for the article
        const commentsResponse = await axios.get(`${API_BASE_URL}/api/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setComments(commentsResponse.data); 
        
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please log in to view this article.');
        } else {
          console.error(error.response ? error.response.data : error.message);
          setError('Failed to load article and comments. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticleAndComments();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Article deleted successfully!");
      navigate('/home');
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError('Failed to delete article. Please try again later.');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`${API_BASE_URL}/api/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setArticle(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError('Failed to update article. Please try again later.');
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to comment.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/comments/${id}`, { content: comment }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update comments array with the new comment
      setComments((prevComments) => [...prevComments, response.data]);
      setComment(''); 
      
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError('Failed to post comment. Please try again later.');
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!article) {
    return <div>No article found.</div>;
  }

  return (
    <div className="p-8 text-black w-full sm:w-[90%] lg:w-[80%] mx-auto mt-[70px] rounded bg-white">
      {/* Back Button */}
      <button onClick={handleGoBack} className="text-blue-500 hover:text-blue-700 mb-4">
        ← Back
      </button>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="border p-2 mb-4 w-full"
            required
            rows="5"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 mr-2">
            Update Article
          </button>
          <button type="button" className="bg-gray-300 text-black p-2" onClick={handleEditToggle}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="rounded-lg">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600">{article.author}</div>
            <div className="flex space-x-2">
              <FaEdit 
                className="text-blue-500 cursor-pointer hover:text-blue-700" 
                onClick={handleEditToggle} 
                title="Edit Article" 
              />
              <FaTrash 
                className="text-red-500 cursor-pointer hover:text-red-700" 
                onClick={handleDelete} 
                title="Delete Article" 
              />
            </div>
          </div>
          <div className="text-sm text-gray-500 mb-4">
            {formatDate(article.date)} • {article.views} views • {comments.length} comments
          </div>
          <p className="text-lg">{article.content}</p>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="border border-gray-700 p-4 mb-2 w-full rounded-lg"
            required
            rows="3"
            placeholder="Add a comment..."
          />
          <button   
            type="submit" 
            className=" bg-green-600 text-white p-2 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition duration-300"
          >
            Post Comment
          </button>
        </form>
        <div>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="border-b border-gray-200 py-2">
                <p className="text-gray-700">{comment.content}</p>
                <span className="text-gray-500 text-sm">{formatDate(comment.date)}</span>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
