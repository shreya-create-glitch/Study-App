import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:1000/interview')
      .then(res => {
        const sorted = res.data.sort((a, b) => b._id.localeCompare(a._id));
        setQuestions(sorted.slice(0, 3));
      })
      .catch(err => console.error('Failed to fetch interview questions:', err));
  }, []);

  const handleChange = (id) => {
    navigate(`/questiondetail/${id}`);
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">💼 Interview Questions</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {questions.map((item) => (
          <div
            key={item._id}
            className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-md font-medium text-gray-900 mb-2 truncate">{item.question}</h2>
            <button
              onClick={() => handleChange(item._id)}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              See Answer →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interview;
