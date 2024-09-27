const Quiz = require('../models/Quiz');

// Fetch all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
};

// Fetch quiz by ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
};

// Submit a quiz
exports.submitQuiz = async (req, res) => {
    const { answers } = req.body;
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        if (!answers || answers.length !== quiz.questions.length) {
            return res.status(400).json({ error: 'Incomplete answers provided' });
        }

        let score = 0;

        // Calculate score
        quiz.questions.forEach((question, index) => {
            if (question.answerOptions.some(option => option.isCorrect && option.text === answers[index])) {
                score++;
            }
        });

        res.json({ score });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit the quiz' });
    }
};
