const express = require('express');
const router = express.Router();
const QuestionVisit = require('../models/QuestionVisit');


router.get('/question-status/:userId', async (req, res) => {
  const { userId } = req.params;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  try {
    const [todayVisit, yesterdayVisit] = await Promise.all([
      QuestionVisit.findOne({ userId, date: today }),
      QuestionVisit.findOne({ userId, date: yesterday }),
    ]);

    const todayCount = todayVisit?.count || 0;
    const yesterdayCount = yesterdayVisit?.count || 0;
    const diff = yesterdayCount - todayCount;

    let alert = null;
    if (diff === 1) {
      alert = '1 more questions required to maintain flow.';
    } else if (diff > 1) {
      alert = `You visited ${diff} fewer questions than yesterday. Try to catch up!`;
    }

    res.json({ todayCount, yesterdayCount, alert });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});





router.post('/visit/:userId', async (req, res) => {
  const { userId } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const visit = await QuestionVisit.findOneAndUpdate(
      { userId, date: today },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    res.json({ message: 'Visit logged', visit });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});








module.exports = router;



