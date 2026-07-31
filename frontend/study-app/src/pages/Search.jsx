import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [book, setBook] = useState([]);
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [bookRes, questionRes] = await Promise.all([
          axios.get(
            `https://study-app-2-82ch.onrender.com/book?search=${query}`
          ),
          axios.get(
            `https://study-app-2-82ch.onrender.com/interview?search=${query}`
          ),
        ]);

        // Book API returns an object
        setBook(bookRes.data.books || []);

        // Interview API returns an array
        setQuestion(Array.isArray(questionRes.data) ? questionRes.data : []);
      } catch (error) {
        console.error(error);
        setBook([]);
        setQuestion([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    } else {
      setBook([]);
      setQuestion([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Search Results for{" "}
        <span className="text-blue-600">"{query}"</span>
      </h2>

      {/* BOOKS */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Books</h3>

        {book.length === 0 ? (
          <p className="text-gray-500">No books found.</p>
        ) : (
          <div className="grid gap-6">
            {book.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {item.title}
                </h3>

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
      </div>

      {/* INTERVIEW QUESTIONS */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Interview Questions
        </h3>

        {question.length === 0 ? (
          <p className="text-gray-500">
            No Interview Questions found.
          </p>
        ) : (
          <div className="grid gap-6">
            {question.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {item.title}
                </h3>

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
    </div>
  );
};

export default Search;

