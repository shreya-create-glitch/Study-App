
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DropDown from "./DropDown";
import Input from "./Input";

import { FaSearch } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { VscOpenPreview } from "react-icons/vsc";

const Navbar = ({ setdark, dark }) => {

  // LOGIN POPUP STATE
  const [open, setOpen] = useState(false);

  // SEARCH STATE
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // USER
  const user = JSON.parse(localStorage.getItem("user"));

  // LOGIN / LOGOUT
  const handleAuth = () => {

    // LOGOUT
    if (user) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("Logged out successfully");

      window.location.reload();
    }

    // LOGIN POPUP
    else {
      setOpen(true);
    }
  };

  // SEARCH
  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/search?query=${search}`);
      setSearch("");
    }
  };

  // DARK MODE
  const toggleDark = () => {
    setdark(!dark);
  };

  // PROTECTED ROUTES
  const protectedLink = (path) => ({
    to: user ? path : "/",
    onClick: !user
      ? (e) => {
          e.preventDefault();
          setOpen(true);
        }
      : undefined,
  });

  return (
    <>
      <nav className="w-full bg-black text-white shadow-md border-b border-gray-700">

        <Toaster />

        {/* TOP ROW */}
        <div className="flex items-center justify-between px-2 py-3">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-1 text-lg sm:text-xl font-bold text-blue-400 shrink-0"
          >
            <FaBookOpenReader className="text-xl sm:text-2xl" />
            <span>StudyHub</span>
          </Link>

          {/* SEARCH */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center mx-2 flex-1 max-w-[140px] sm:max-w-[220px]"
          >
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 bg-white text-black px-2 py-1 rounded-l-md text-xs sm:text-sm outline-none"
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-r-md"
            >
              <FaSearch className="text-xs sm:text-sm" />
            </button>
          </form>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 shrink-0">

            {/* THEME BUTTON */}
            <button
              onClick={toggleDark}
              className="text-lg"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            {/* LOGIN / LOGOUT */}
            <button
              onClick={handleAuth}
              className={`px-2 py-1 rounded-md text-xs sm:text-sm text-white whitespace-nowrap ${
                user ? "bg-red-500" : "bg-blue-500"
              }`}
            >
              {user ? "Logout" : "Login"}
            </button>

          </div>
        </div>

        {/* MOBILE NAVBAR */}
        <div className="flex md:hidden justify-around items-center py-3 border-t border-gray-700 text-xs sm:text-sm text-white flex-wrap gap-2">

          <Link
            to="/"
            className="hover:text-blue-400 transition whitespace-nowrap"
          >
            Home
          </Link>

          <Link
            {...protectedLink("/debug")}
            className="flex items-center gap-1 hover:text-blue-400 transition whitespace-nowrap"
          >
            <VscOpenPreview />
            AI View
          </Link>

          <Link
            {...protectedLink("/interview")}
            className="hover:text-blue-400 transition whitespace-nowrap"
          >
            Interview
          </Link>

          <Link
            {...protectedLink("/books")}
            className="hover:text-blue-400 transition whitespace-nowrap"
          >
            Books
          </Link>

          <Link
            to="/question"
            className="text-purple-400 hover:text-purple-300 transition whitespace-nowrap"
          >
            Visited
          </Link>

        </div>

        {/* DESKTOP NAVBAR */}
        <div className="hidden md:flex items-center justify-center gap-8 py-3 border-t border-gray-700 text-sm text-white">

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            {...protectedLink("/debug")}
            className="flex items-center gap-1 hover:text-blue-400 transition"
          >
            <VscOpenPreview />
            AI View
          </Link>

          <Link
            {...protectedLink("/interview")}
            className="hover:text-blue-400 transition"
          >
            Interview Q
          </Link>

          <Link
            {...protectedLink("/books")}
            className="hover:text-blue-400 transition"
          >
            Books
          </Link>

          <Link
            to="/question"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Visited
          </Link>

        </div>

      </nav>

      {/* LOGIN POPUP */}
      {open && !user && (
        <DropDown onClose={() => setOpen(false)}>
          <Input onClose={() => setOpen(false)} />
        </DropDown>
      )}
    </>
  );
};

export default Navbar;