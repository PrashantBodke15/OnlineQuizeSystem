const Result = require('../models/Result');
const Question = require('../models/Question');
async function create(req, res, next) {
  try {
    const { quiz, answers = [] } = req.body;
    const questions = await Question.find({ quiz });
    const details = questions.map((question) => { const selected = answers.find((a) => String(a.question) === String(question._id))?.selectedAnswer || ''; return { question: question._id, selectedAnswer: selected, correctAnswer: question.correctAnswer, isCorrect: selected === question.correctAnswer }; });
    const correctAnswers = details.filter((a) => a.isCorrect).length;
    const totalQuestions = questions.length;
    const result = await Result.create({ user: req.user._id, quiz, score: correctAnswers, totalQuestions, correctAnswers, wrongAnswers: totalQuestions - correctAnswers, percentage: totalQuestions ? Math.round(correctAnswers / totalQuestions * 100) : 0, answers: details });
    res.status(201).json(await result.populate('quiz', 'title'));
  } catch (e) { next(e); }
}
const mine = async (req, res, next) => { try { res.json(await Result.find({ user: req.user._id }).populate('quiz', 'title').sort('-submittedAt')); } catch (e) { next(e); } };
const one = async (req, res, next) => { try { const result = await Result.findById(req.params.id).populate('quiz', 'title'); if (!result || (String(result.user) !== String(req.user._id) && req.user.role !== 'admin')) return res.status(404).json({ message: 'Result not found' }); res.json(result); } catch (e) { next(e); } };
const all = async (req, res, next) => { try { res.json(await Result.find().populate('user', 'name email').populate('quiz', 'title').sort('-submittedAt')); } catch (e) { next(e); } };
module.exports = { create, mine, one, all };