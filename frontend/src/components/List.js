import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For linking to quiz page
import './List.css'; // Importing the CSS

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/quizzes')
            .then(response => {
                console.log(response.data); // Log the response data to check if it's fetched
                setQuizzes(response.data);
            })
            .catch(error => {
                console.error(error); // Log any errors
                setError('Error fetching quizzes');
            });
    }, []);

    return (
        <div className="quiz-list-container ">
            <h1> QUIZZERS</h1>
            
            {error && <p className="error-message">{error}</p>}
            {quizzes.length > 0 ? (
                quizzes.map(quiz => (
                    <div key={quiz._id} className="quiz-card  ">
                            
                            <h2>{quiz.title}</h2>
                            <p>{quiz.description}</p>
                            <Link to={`/quiz/${quiz._id}`}>
                                <button className="start-quiz-btn">Take Quiz</button>
                            </Link>
                        </div>
                  
                ))
            ) : (
                <p className="loading-message">Loading...</p>
            )}
        </div>

    );
};

export default QuizList;
