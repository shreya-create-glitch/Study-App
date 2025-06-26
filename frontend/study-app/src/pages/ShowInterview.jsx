import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const ShowInterview = () => {
    const [data,setdata]=useState("");
    const {id}=useParams();
    useEffect(()=>{
     axios.get(`http://localhost:1000/interview/${id}`).then(res=>{
        setdata(res.data);
     }).catch(err=>{
      console.log(err);
     })
    },[id]);
  return (
     <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{data.question}</h1>
        <p className="text-gray-700 mb-4"><strong>Answer:</strong> {data.answer}</p>
        <p className="text-sm text-gray-500 mb-1"><strong>Category:</strong> {data.category }</p>
        <p className="text-sm text-gray-500"><strong>Difficulty:</strong> {data.difficulty }</p>
      </div>
      </div>
  )
}

export default ShowInterview
