const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String },
  difficulty: { type: String }
},{timestamps:true});

module.exports = mongoose.model('Interview', interviewSchema);
