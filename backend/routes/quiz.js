const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  getTodayQuiz,
  submitQuiz,
} = require("../controllers/Quiz");

// 🔥 PERSONALIZED QUIZ
router.get("/today", auth, getTodayQuiz);

// 🔥 SUBMIT
router.post("/submit", auth, submitQuiz);

module.exports = router;