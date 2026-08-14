
import React, { useEffect, useState } from 'react';
import ReactGA from "react-ga4";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './pages/sidebar';
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
import DailyQuiz from './pages/DailyQuiz';
const App = () => {
  const [dark, setdark] = useState(false);



useEffect(() => {
  console.log("GA initialized");

  ReactGA.initialize("G-TQRNPE0ZBZ");

  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: "app.jsx"
  });
}, []);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
     
      <BrowserRouter>
  <div className="flex min-h-screen">

    <Sidebar />

    <div className="flex flex-col flex-1">
      <Navbar setdark={setdark} dark={dark} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home dark={dark} />} />
          <Route path="/debug" element={<Debug />} />
          <Route path="/books" element={<Books />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/quiz" element={<DailyQuiz />} />
          <Route path="/question" element={<QuestionStatus />} />
          <Route path="/detail/:id" element={<ShowBook />} />
          <Route path="/questiondetail/:id" element={<ShowInterview />} />
          <Route path="/search" element={<Search />} />
          <Route path="/editbook/:id" element={<EditBook />} />
          <Route path="/addbook" element={<AddBook />} />
        </Routes>
      </main>

      <Footer />
    </div>

  </div>
</BrowserRouter>
    </div>
  );
};

export default App;
