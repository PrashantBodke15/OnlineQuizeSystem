const Quiz = require("../models/Quiz");


// CREATE QUIZ
const createQuiz = async (req, res) => {
    try {
        const {
            title,
            description,
            subject,
            duration,
            questions
        } = req.body;

        const quiz = await Quiz.create({
            title,
            description,
            subject,
            duration,
            questions,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            quiz
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL QUIZZES
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find()
            .populate("createdBy", "name email");

        res.json({
            success: true,
            count: quizzes.length,
            quizzes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET SINGLE QUIZ
const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        res.json({
            success: true,
            quiz
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE QUIZ
const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        res.json({
            success: true,
            message: "Quiz updated successfully",
            quiz
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE QUIZ
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        res.json({
            success: true,
            message: "Quiz deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz
};