import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import DropDown from './DropDown';
import Input from './Input';
import { FaSearch } from 'react-icons/fa';
import { FaBookOpenReader } from 'react-icons/fa6';
import { VscOpenPreview } from 'react-icons/vsc';

const Navbar = ({ setdark, dark }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
      window.location.reload();
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
    setSearch('');
  };

  const toggleDark = () => setdark(!dark);

  const protectedLink = (path) => ({
    to: user ? path : '/',
    onClick: !user ? () => setOpen(true) : undefined,
  });

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700 w-full">
        <Toaster />
        <div className="w-full px-4 flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center text-xl font-bold text-blue-600 dark:text-blue-400 space-x-2">
              <FaBookOpenReader className="text-2xl text-blue-600 dark:text-blue-400" />
              <span>StudyHub</span>
            </Link>
          </div>

          {/* Center: Search */}
          <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-3 flex-1 justify-center">
            <label htmlFor="navbar-search" className="sr-only">Search</label>
            <input
              id="navbar-search"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              <FaSearch className="text-base" />
            </button>
          </form>

          {/* Right: Links + Auth */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="nav-link">Home</Link>
              <Link {...protectedLink("/books")} className="nav-link">Books</Link>
              <Link {...protectedLink("/interview")} className="nav-link">Interview Q</Link>
              <Link {...protectedLink("/debug")} className="nav-link">
                <span className="flex items-center gap-1">
                  <VscOpenPreview size={19} />
                  AIVue
                </span>
              </Link>
              <Link to="/question" className="nav-link font-semibold text-purple-600 dark:text-purple-400 hover:underline underline-offset-4">
                Visited
              </Link>
            </div>

            <button onClick={toggleDark} className="text-xl">
              {dark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={handleAuth}
              className={`px-3 py-2 rounded-md text-sm text-white ${user ? 'bg-red-500' : 'bg-blue-500'}`}
            >
              {user ? `Logout (${user.email})` : 'Login'}
            </button>
          </div>
        </div>
      </nav>

      {/* Login Popup */}
      {open && !user && (
        <DropDown onClose={() => setOpen(false)}>
          <Input onClose={() => setOpen(false)} />
        </DropDown>
      )}
    </>
  );
};

export default Navbar;



