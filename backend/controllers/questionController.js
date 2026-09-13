const Question = require('../models/Question');
const byQuiz = async (req, res, next) => { try { res.json(await Question.find({ quiz: req.params.quizId }).select('-correctAnswer')); } catch (e) { next(e); } };
const create = async (req, res, next) => { try { const question = await Question.create(req.body); res.status(201).json({ ...question.toObject(), message: 'Question created successfully' }); } catch (e) { next(e); } };
const update = async (req, res, next) => { try { const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); res.json({ ...question.toObject(), message: 'Question updated successfully' }); } catch (e) { next(e); } };
const remove = async (req, res, next) => { try { await Question.findByIdAndDelete(req.params.id); res.json({ message: 'Question deleted' }); } catch (e) { next(e); } };
module.exports = { byQuiz, create, update, remove };