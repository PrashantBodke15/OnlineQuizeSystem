const Subject = require('../models/Subject');
const all = async (req, res, next) => { try { res.json(await Subject.find().sort('name')); } catch (e) { next(e); } };
const one = async (req, res, next) => { try { const item = await Subject.findById(req.params.id); if (!item) return res.status(404).json({ message: 'Subject not found' }); res.json(item); } catch (e) { next(e); } };
const create = async (req, res, next) => { try { const subject = await Subject.create(req.body); res.status(201).json({ ...subject.toObject(), message: 'Subject created successfully' }); } catch (e) { next(e); } };
const update = async (req, res, next) => { try { const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); res.json({ ...subject.toObject(), message: 'Subject updated successfully' }); } catch (e) { next(e); } };
const remove = async (req, res, next) => { try { await Subject.findByIdAndDelete(req.params.id); res.json({ message: 'Subject deleted' }); } catch (e) { next(e); } };
module.exports = { all, one, create, update, remove };