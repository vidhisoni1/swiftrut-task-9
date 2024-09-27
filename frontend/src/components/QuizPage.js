import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './QuizPage.css';

const QuizPage = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState(null);  // Add this line to define the error state
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/quizzes/${id}`)
                .then(response => setQuiz(response.data))
                .catch(error => setError('Error fetching quiz'));  // setError is used here
        }
    }, [id]);

    const handleSubmit = () => {
        axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, { answers })
            .then(response => {
                setScore(response.data.score);
                setSubmitted(true);
                setShowCorrectAnswers(true);
            })
            .catch(error => setError('Error submitting quiz'));  // setError is used here
    };

    const handleAnswerSelect = (questionIndex, answerText) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answerText;
        setAnswers(updatedAnswers);
    };

    return quiz ? (
        <div className="quiz-container">
            <h1>{quiz.title}</h1>
            {quiz.questions.map((question, index) => {
                const correctAnswer = question.answerOptions.find(option => option.isCorrect).text;
                const userAnswer = answers[index];

                return (
                    <div key={index} className="question-card">
                        <div className="quiz-question">
                            <p>{question.questionText}</p>
                        </div>
                        <div className="quiz-answer-options">
                            {question.answerOptions.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option.text}
                                        onClick={() => handleAnswerSelect(index, option.text)}
                                    />
                                    <label>{option.text}</label>
                                </div>
                            ))}
                        </div>
                        
                        {showCorrectAnswers && (
                            <div>
                                <p className="correct-answer">
                                    <strong>Correct Answer:</strong> {correctAnswer}
                                </p>
                                <p
                                    className={
                                        userAnswer === correctAnswer
                                            ? 'correct-answer'
                                            : 'incorrect-answer'
                                    }
                                >
                                    <strong>Your Answer:</strong> {userAnswer ? userAnswer : 'No answer selected'}
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
            <button onClick={handleSubmit}>Submit</button>

            {submitted && (
                <div className="score-container">
                    <h2>Your Score: {score}</h2>
                    <Link to="/">
                        <button className="back-to-home-btn">Back to Home</button>
                    </Link>
                </div>
            )}
        </div>
    ) : (
        <p>{error || "Loading..."}</p>  // Display error message if it exists
    );
};

export default QuizPage;
