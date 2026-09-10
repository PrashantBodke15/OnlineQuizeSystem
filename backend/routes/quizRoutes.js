const router = require('express').Router();
const controller = require('../controllers/quizController'); const { protect, adminOnly } = require('../middleware/authMiddleware');
router.get('/', controller.all); router.get('/:id', controller.one); router.post('/', protect, adminOnly, controller.create); router.put('/:id', protect, adminOnly, controller.update); router.delete('/:id', protect, adminOnly, controller.remove);
module.exports = router;