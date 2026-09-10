const mongoose = require('mongoose');
module.exports = mongoose.model('Result', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: Number, totalQuestions: Number, correctAnswers: Number, wrongAnswers: Number,
  percentage: Number,
  answers: [{ question: mongoose.Schema.Types.ObjectId, selectedAnswer: String, correctAnswer: String, isCorrect: Boolean }]
}, { timestamps: { createdAt: 'submittedAt', updatedAt: false } }));