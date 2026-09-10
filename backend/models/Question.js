const mongoose = require('mongoose');
module.exports = mongoose.model('Question', new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  questionText: { type: String, required: true },
  optionA: { type: String, required: true }, optionB: { type: String, required: true },
  optionC: { type: String, required: true }, optionD: { type: String, required: true },
  correctAnswer: { type: String, enum: ['A', 'B', 'C', 'D'], required: true }
}));