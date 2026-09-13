require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');
const createApp = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;
const app = createApp();

async function startServer() {
	await connectDB();
	const server = http.createServer(app);

	server.listen(port, () => {
		console.log(`API running at http://localhost:${port}`);
	});

	const shutdown = async (signal) => {
		console.log(`${signal} received. Closing API server.`);
		server.close(async () => {
			await mongoose.connection.close();
			process.exit(0);
		});
	};

	process.once('SIGINT', () => shutdown('SIGINT'));
	process.once('SIGTERM', () => shutdown('SIGTERM'));
}

if (require.main === module) {
	startServer().catch((error) => {
		console.error(`Database connection failed: ${error.message}`);
		process.exit(1);
	});
}

module.exports = { app, startServer };