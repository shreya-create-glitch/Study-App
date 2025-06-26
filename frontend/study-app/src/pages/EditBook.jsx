import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: ''
  });

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:1000/book/${id}`);
      setFormData({
        title: res.data.title,
        author: res.data.author,
        description: res.data.description,
        category: res.data.category
      });
    } catch (error) {
      toast.error('Failed to load book data');
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1000/book/${id}`, formData, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      toast.success('Book updated successfully!');
      navigate('/books');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update book');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded bg-white shadow dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center"> Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          required
        />

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          required
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
