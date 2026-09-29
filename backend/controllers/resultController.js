const Result = require("../models/Result");
const Quiz = require("../models/Quiz");


// SUBMIT QUIZ
const submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        let score = 0;

        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        });

        const totalQuestions = quiz.questions.length;

        const percentage =
            totalQuestions > 0
                ? (score / totalQuestions) * 100
                : 0;

        const result = await Result.create({
            user: req.user.id,
            quiz: quizId,
            score,
            totalQuestions,
            percentage
        });

        res.status(201).json({
            success: true,
            message: "Quiz submitted successfully",
            result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET MY RESULTS
const getMyResults = async (req, res) => {
    try {
        const results = await Result.find({
            user: req.user.id
        })
            .populate("quiz", "title subject")
            .populate("user", "name email");

        res.json({
            success: true,
            count: results.length,
            results
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ONE RESULT
const getResult = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)
            .populate("quiz", "title subject")
            .populate("user", "name email");

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Result not found"
            });
        }

        res.json({
            success: true,
            result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    submitQuiz,
    getMyResults,
    getResult
};