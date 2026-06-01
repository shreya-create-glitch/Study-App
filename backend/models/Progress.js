const mongoose = require("mongoose");

const userQuizSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: String, 
  quizId: mongoose.Schema.Types.ObjectId,
  score: Number,
  attempted: Boolean,
});

module.exports = mongoose.model("UserQuiz", userQuizSchema);