

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MdAutoDelete } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';

// const Book = () => {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user')); // ✅ parse user

//   useEffect(() => {
//     axios.get(`http://localhost:1000/book`)
//       .then(res => {
//         setData(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching books:", err);
//       });
//   }, []);

//   const handleClick = (id) => {
//     navigate(`/detail/${id}`);
//   };

//   const handledelete=async(id)=>{
//     try {
//       axios.delete(`http://localhost:1000/book/${id}`)
//        setData(prev => prev.filter(book => book._id !== id)); 
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📚 Book List</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
//           >
//             {user && user._id === item.createdBy && (
//               <div className="flex justify-end space-x-2 mb-2">
//                 <button className="text-blue-500 hover:text-blue-700"><FaEdit onClick={()=>navigate(`/editbook/${item._id}`)}/></button>
//                 <button className="text-red-500 hover:text-red-700"><MdAutoDelete onClick={()=>handledelete(item._id)} /></button>
//               </div>
//             )}

//             <h2
//               className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer"
//               onClick={() => handleClick(item._id)}
//             >
//               {item.title}
//             </h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Book;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Book = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // ✅ Parse stored user

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:1000/book');
      setData(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/book/${id}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      setData(prev => prev.filter(book => book._id !== id)); // ✅ Update UI
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📚 Book List</h1>
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
            <p className="text-gray-600">{item.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;
