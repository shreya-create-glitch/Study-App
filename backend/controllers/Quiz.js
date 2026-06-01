const Quiz = require("../models/Quiz");
const User = require("../models/user");

// 🔥 GET PERSONALIZED QUIZ
const getTodayQuiz = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. get user profile
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. match quiz based on topics
    const quiz = await Quiz.find({
      category: { $in: user.topics },
    }).sort({ createdAt: -1 });

    if (!quiz.length) {
      return res.json({ message: "No quiz available" });
    }

    // 3. send first quiz
    res.json({
      quiz: quiz[0],
      userTopics: user.topics,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 SUBMIT QUIZ
const submitQuiz = async (req, res) => {
  try {
    const { quizId, answer } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const isCorrect = quiz.answer === answer;

    res.json({
      correct: isCorrect,
      score: isCorrect ? 1 : 0,
      message: isCorrect ? "Correct Answer 🎉" : "Wrong Answer ❌",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTodayQuiz, submitQuiz };