require('dotenv').config();
const express = require('express'); const cors = require('cors');
const connectDB = require('./config/db'); const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const app = express();
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({ origin: (origin, callback) => {
	if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
	return callback(new Error('CORS origin is not allowed'));
} }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'online-quiz-system' }));
app.use('/api/auth', require('./routes/authRoutes')); app.use('/api/subjects', require('./routes/subjectRoutes')); app.use('/api/quizzes', require('./routes/quizRoutes')); app.use('/api/questions', require('./routes/questionRoutes')); app.use('/api/results', require('./routes/resultRoutes'));
app.use(notFound); app.use(errorHandler);           
const port = process.env.PORT || 5000;
if (require.main === module) connectDB().then(() => app.listen(port, () => console.log(`API running at http://localhost:${port}`))).catch((error) => { console.error(`Database connection failed: ${error.message}`); process.exit(1); });
module.exports = app;