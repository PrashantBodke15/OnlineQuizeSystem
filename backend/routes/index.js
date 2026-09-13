const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/subjects', require('./subjectRoutes'));
router.use('/quizzes', require('./quizRoutes'));
router.use('/questions', require('./questionRoutes'));
router.use('/results', require('./resultRoutes'));

module.exports = router;
