const mongoose = require('mongoose');
module.exports = mongoose.model('Quiz', new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  duration: { type: Number, required: true, min: 1 },
  totalQuestions: { type: Number, required: true, min: 1 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }));