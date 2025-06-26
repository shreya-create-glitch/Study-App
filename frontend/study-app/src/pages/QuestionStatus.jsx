import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionStatus = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [alertMsg, setAlertMsg] = useState(null); 

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1000/api/interview/question-status/${userId}`);
        
        const today = data?.todayCount || 0;
        const yesterday = data?.yesterdayCount || 0;
        const diff = yesterday - today;

        setVisitCount(today);

        
        if (diff > 0) {
          setAlertMsg(`⚠️ You visited ${diff} fewer question(s) than yesterday.`);
        }

      } catch (error) {
        console.error("Error fetching visit count:", error);
      }
    };

    if (userId) {
      fetchVisitCount();
    }
  }, [userId]);

  if (!userId) {
    return <p className="text-center text-red-600">You must be logged in to view your visit count.</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Questions Visited Today</h2>
      <p className="text-lg text-gray-700">{visitCount} questions</p>

      
      {alertMsg && (
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
          {alertMsg}
        </div>
      )}
    </div>
  );
};

export default QuestionStatus;
