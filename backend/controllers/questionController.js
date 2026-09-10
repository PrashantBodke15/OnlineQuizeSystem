const Question = require('../models/Question');
const byQuiz = async (req, res, next) => { try { res.json(await Question.find({ quiz: req.params.quizId }).select('-correctAnswer')); } catch (e) { next(e); } };
const create = async (req, res, next) => { try { res.status(201).json(await Question.create(req.body)); } catch (e) { next(e); } };
const update = async (req, res, next) => { try { res.json(await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })); } catch (e) { next(e); } };
const remove = async (req, res, next) => { try { await Question.findByIdAndDelete(req.params.id); res.json({ message: 'Question deleted' }); } catch (e) { next(e); } };
module.exports = { byQuiz, create, update, remove };