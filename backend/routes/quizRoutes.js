const express = require('express');
const router = express.Router();
const { getAllQuizzes, getQuizById, submitQuiz } = require('../controllers/quizController');
const Quiz = require('../models/Quiz');

// Get all quizzes
router.get('/', getAllQuizzes);

// Get quiz by ID
router.get('/:id', getQuizById);

// Submit quiz
router.post('/:id/submit', submitQuiz);

router.post('/', async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create quiz' });
    }
});

module.exports = router;
