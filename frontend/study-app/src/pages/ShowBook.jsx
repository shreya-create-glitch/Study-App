import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowBook = () => {
  const [data, setData] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:1000/book/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📖 Book Details</h1>
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{data.title}</h2>
        <p className="text-gray-600"><strong>Author:</strong> {data.author}</p>
        <p className="text-gray-700 mt-2"><strong>Description:</strong> {data.description}</p>
        <p className="text-gray-700 mt-2"><strong>Content:</strong> {data.content}</p>
      </div>
    </div>
  );
};

export default ShowBook;
