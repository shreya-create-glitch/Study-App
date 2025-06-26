import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomeBook = ({dark}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:1000/book`)
      .then(res => {
        const sorted = res.data.sort((a, b) => b._id.localeCompare(a._id));
        setData(sorted.slice(0, 3));
      })
      .catch(err => {
        console.error("Error fetching books:", err);
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
<div className={dark ? "p-4 bg-black text-white rounded-md" : "p-4 bg-white text-black rounded-md"}>
      <h1 className="text-xl font-bold text-gray-800 text-center mb-4">📚 Featured Books</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item._id}
            onClick={() => handleClick(item._id)}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg p-4 shadow-sm transition"
          >
            <h2 className="text-lg font-semibold text-gray-900 truncate mb-1">
              {item.title}
            </h2>
            <p className="text-sm text-gray-600 truncate">
              {item.description || "No description."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBook;
