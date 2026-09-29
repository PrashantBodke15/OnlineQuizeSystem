const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");

const createApp = () => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Home API
    app.get("/", (req, res) => {
        res.json({
            success: true,
            message: "Online Quiz System API is running"
        });
    });

    // API routes
    app.use("/api/auth", authRoutes);
    app.use("/api/quizzes", quizRoutes);
    app.use("/api/results", resultRoutes);

    // 404
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: "API route not found"
        });
    });

    // Error handler
    app.use((error, req, res, next) => {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    });

    return app;
};

module.exports = createApp;