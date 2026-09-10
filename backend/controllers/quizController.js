const Quiz = require('../models/Quiz');
const all = async (req, res, next) => { try { res.json(await Quiz.find().populate('subject', 'name').sort('-createdAt')); } catch (e) { next(e); } };
const one = async (req, res, next) => { try { const item = await Quiz.findById(req.params.id).populate('subject', 'name'); if (!item) return res.status(404).json({ message: 'Quiz not found' }); res.json(item); } catch (e) { next(e); } };
const create = async (req, res, next) => { try { res.status(201).json(await Quiz.create({ ...req.body, createdBy: req.user._id })); } catch (e) { next(e); } };
const update = async (req, res, next) => { try { res.json(await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })); } catch (e) { next(e); } };
const remove = async (req, res, next) => { try { await Quiz.findByIdAndDelete(req.params.id); res.json({ message: 'Quiz deleted' }); } catch (e) { next(e); } };
module.exports = { all, one, create, update, remove };