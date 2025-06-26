
const mongoose = require('mongoose');

const questionVisitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  count: { type: Number, default: 0 },
}, { timestamps: true });

questionVisitSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('QuestionVisit', questionVisitSchema);


