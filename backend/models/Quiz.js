const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,

  // 🔥 IMPORTANT FIELD
  category: {
    type: String, // DSA, DBMS, WEB
    required: true,
  },

  difficulty: {
    type: String,
    default: "easy",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);