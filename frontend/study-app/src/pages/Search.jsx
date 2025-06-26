

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const [book, setBook] = useState([]);
  const [question,setquestion]=useState([])
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/book?search=${query}`);
        setBook(res.data);
      } catch (error) {
        console.error('Error fetching book results:', error);
      }
    };

const fetchquestions=async()=>{
    try {
      const res=await axios.get(`http://localhost:1000/interview?search=${query}`);
    setquestion(res.data)
    } catch (error) {
    console.error('Error fetching questions results:', error);

    } 
     
  }
fetchquestions();
    fetchBook();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Search Results for "<span className="text-blue-600">{query}</span>"
      </h2>
      {book.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <div className="grid gap-6">
          {book.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{item.title}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                <strong>Author:</strong> {item.author}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Category:</strong> {item.category}
              </p>
              
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center">
        Search Results for "<span className="text-blue-600">{query}</span>"
      </h2>
      {question.length === 0 ? (
        <p className="text-center text-gray-500">No Interview Questions found.</p>
      ) : (
        <div className="grid gap-6">
          {question.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{item.title}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                <strong>Question:</strong> {item.question}
              </p>
             
               <p className="text-gray-700 dark:text-gray-300">
                <strong>Answer:</strong> {item.answer}
              </p>

               <p className="text-gray-700 dark:text-gray-300">
                <strong>Category:</strong> {item.category}
              </p>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Search;




