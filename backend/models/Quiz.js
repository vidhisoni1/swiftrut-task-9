const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [
        {
            questionText: { type: String, required: true },
            answerOptions: [{ text: String, isCorrect: Boolean }]
        }
    ]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
