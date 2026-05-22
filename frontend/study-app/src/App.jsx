



import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Books from './pages/Book';
import Interview from './pages/Interview';
import Debug from './pages/Debug';
import ShowBook from './pages/ShowBook';
import ShowInterview from './pages/ShowInterview';
import Search from './pages/Search'
import EditBook from './pages/EditBook';
import AddBook from './pages/AddBook';
import QuestionStatus from './pages/QuestionStatus';
const App = () => {
  const [dark, setdark] = useState(false);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
      <BrowserRouter>
        <Navbar setdark={setdark} dark={dark} />

        <main className="flex-grow">
          <Routes>
            <Route path="/question" element={<QuestionStatus></QuestionStatus>}></Route>
            <Route path="/editbook/:id" element={<EditBook></EditBook>}></Route>
            <Route path="/addbook" element={<AddBook></AddBook>}></Route>
            <Route path="/" element={<Home dark={dark} />} />
            <Route path="/debug" element={<Debug />} />
            <Route path="/books" element={<Books />} />
            <Route path="/interview" element={<Interview />} />
            
            <Route path="/detail/:id" element={<ShowBook />} />
            <Route path="/questiondetail/:id" element={<ShowInterview />} />
            <Route path="/search" element={<Search></Search>}></Route>
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
