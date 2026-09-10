const router = require('express').Router();
const controller = require('../controllers/resultController'); const { protect, adminOnly } = require('../middleware/authMiddleware');
router.post('/', protect, controller.create); router.get('/my-results', protect, controller.mine); router.get('/all', protect, adminOnly, controller.all); router.get('/:id', protect, controller.one);
module.exports = router;