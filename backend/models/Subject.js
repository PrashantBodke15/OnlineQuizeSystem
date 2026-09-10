const mongoose = require('mongoose');
module.exports = mongoose.model('Subject', new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' }
}, { timestamps: true }));