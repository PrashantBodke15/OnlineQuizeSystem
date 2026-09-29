const express = require("express");

const {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz
} = require("../controllers/quizController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Public
router.get("/", getQuizzes);

router.get("/:id", getQuiz);


// Protected
router.post("/", protect, createQuiz);

router.put("/:id", protect, updateQuiz);

router.delete("/:id", protect, deleteQuiz);


module.exports = router;