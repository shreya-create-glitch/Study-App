import React from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaQuestionCircle,
  FaBug,
  FaHistory,
} from "react-icons/fa";
import { MdQuiz } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold text-blue-400 mb-8">
        StudyHub
      </h2>

      <ul className="space-y-4">
        <li>
          <Link
            to="/books"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
          >
            <FaBook />
            Books
          </Link>
        </li>

        <li>
          <Link
            to="/interview"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
          >
            <FaQuestionCircle />
            Interview Questions
          </Link>
        </li>

        <li>
          <Link
            to="/debug"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
          >
            <FaBug />
            AI View
          </Link>
        </li>

        <li>
          <Link
            to="/question"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
          >
            <FaHistory />
            Visited
          </Link>
        </li>

        <li>
          <Link
            to="/quiz"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
          >
            <MdQuiz />
            Daily Quiz
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;