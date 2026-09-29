const express = require("express");

const {
    submitQuiz,
    getMyResults,
    getResult
} = require("../controllers/resultController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit", protect, submitQuiz);

router.get("/my-results", protect, getMyResults);

router.get("/:id", protect, getResult);

module.exports = router;