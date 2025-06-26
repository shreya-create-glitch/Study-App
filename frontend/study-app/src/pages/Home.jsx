import React from 'react';
import HomeBook from './home/HomeBook';
import HomeInterview from './home/HomeInterview';
import Input from '../components/Input';
import { useState } from 'react';
import Selectbox from '../components/Selectbox';
const Home = ({ dark }) => {
const [open,setisopen]=useState(false)
const handleClick=()=>{
setisopen(pre=>!pre)  

}
  return (
    <div className={`${dark ? "bg-black text-white" : "min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 text-black"}`}>
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${dark ? "text-blue-400" : "text-blue-600"}`}>
            StudyHub – Your Smart Learning Companion
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`}>
            The all-in-one platform for effective learning and skill development
          </p>
        </div>
<button 
  onClick={handleClick} 
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
  
  Add Content
  
</button>
{open && <Selectbox />}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            <h2 className={`text-3xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-800"}`}>
              Why Choose StudyHub?
            </h2>
            <ul className={`space-y-4 text-lg ${dark ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                Comprehensive collection of study materials
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                Curated interview questions from top companies
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                Progress tracking and personalized recommendations
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3">✓</span>
                Accessible anytime, anywhere
              </li>
            </ul>
          </div>

          <div className="flex-1 max-w-xl">
            <img
              src="/Study-App.jpg"
              alt="Study App Interface"
              className="rounded-2xl shadow-xl w-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      
      <section className={`py-16 px-6 ${dark ? "bg-black-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${dark ? "text-white" : "text-gray-800"}`}>
            <span className="border-b-4 border-blue-500 pb-2">Featured Study Materials</span>
          </h2>
          <HomeBook  />
        </div>
      </section>

      
      <section className={`py-16 px-6 ${dark ? "bg-black-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${dark ? "text-white" : "text-gray-800"}`}>
            <span className="border-b-4 border-blue-500 pb-2">Interview Preparation</span>
          </h2>
          <HomeInterview />
        </div>
      </section>

      
      
    </div>
  );
};

export default Home;
