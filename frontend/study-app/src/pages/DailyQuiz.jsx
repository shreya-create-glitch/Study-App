import React, { useEffect, useState } from "react";
import axios from "axios";

const DailyQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


  const fetchQuiz = async () => {
    try {
      const res = await axios.get(
        "https://study-app-1-u0bd.onrender.com/quiz/today",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuiz(res.data.quiz);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  // SUBMIT ANSWER
  const submitQuiz = async () => {
    try {
      const res = await axios.post(
        "https://study-app-1-u0bd.onrender.com/quiz/submit",
        {
          quizId: quiz._id,
          answer: selected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  }

  // NO QUIZ
  if (!quiz) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        No Quiz Available 
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
           Daily Quiz
        </h1>

        {/* RESULT */}
        {result ? (
          <div className="text-center space-y-3">
            <h2 className="text-xl font-semibold">
              {result.correct ? " Correct!" : "Wrong Answer"}
            </h2>
            <p className="text-gray-700">
              Score: <span className="font-bold">{result.score}</span>
            </p>
            <p className="text-sm text-gray-500">{result.message}</p>
          </div>
        ) : (
          <>
            {/* QUESTION */}
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-700">
                {quiz.question}
              </h2>
            </div>

            {/* OPTIONS */}
            <div className="space-y-3">
              {quiz.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(opt)}
                  className={`w-full p-3 rounded-xl border text-left transition
                    ${
                      selected === opt
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white hover:bg-gray-100"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* SUBMIT */}
            <button
              onClick={submitQuiz}
              disabled={!selected}
              className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition
                ${
                  selected
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-300 cursor-not-allowed"
                }`}
            >
              Submit Answer 
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyQuiz;