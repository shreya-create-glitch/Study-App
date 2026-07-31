import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Book = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `https://study-app-1-u0bd.onrender.com/book?page=${page}&limit=2`
      );

      setData(res.data.books);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.error("Error fetching books:", err);
      toast.error("Failed to fetch books");
    }
  };

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://study-app-2-82ch.onrender.com/book/${id}`,
        {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );

      toast.success("Book deleted successfully");

      // Refresh current page
      fetchBooks();

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📚 Book List
      </h1>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No books found
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
              >

                {user && user._id === item.createdBy && (
                  <div className="flex justify-end space-x-2 mb-2">

                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/editbook/${item._id}`)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item._id)}
                    >
                      <MdAutoDelete />
                    </button>

                  </div>
                )}

                <h2
                  className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer"
                  onClick={() => handleClick(item._id)}
                >
                  {item.title}
                </h2>

                <p className="text-gray-600">
                  {item.author}
                </p>

              </div>
            ))}

          </div>

          {/* Pagination */}

          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            <span className="font-semibold text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default Book;