import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:1000/interview')
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Failed to fetch interview questions:', err));
  }, []);

  


const handleChange = async (id) => {
    try {
      const userId = localStorage.getItem("userId"); 

      if (!userId) {
        console.error("User not logged in or userId missing");
        return;
      }

      
      await axios.post(`http://localhost:1000/api/interview/visit/${userId}`);

      
      navigate(`/questiondetail/${id}`);
    } catch (error) {
      console.error("Error tracking visit:", error);
      navigate(`/questiondetail/${id}`); 
    }
  };




  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">💼 Interview Questions</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {questions.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-3">{item.question}</h2>
            
            <button
              onClick={() => handleChange(item._id)}
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              See Answer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interview;





