// src/pages/QuizPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quizzes/${id}`);
        setQuiz(res.data);
      } catch (err) {
        console.error("Failed to fetch quiz", err);
        alert("Failed to load quiz.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id, navigate]);

  const handleAnswerSelect = (option) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const answersArray = Object.values(userAnswers);
      const res = await API.post(`/quizzes/submit/${id}`, { userAnswers: answersArray });
      navigate(`/results/${id}`, { state: { score: res.data.score } });
    } catch (err) {
      console.error("Failed to submit quiz", err);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-8">Loading quiz...</div>;
  if (!quiz) return <div className="text-center mt-8">Quiz not found.</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
        <div className="text-lg mb-6">
          <p className="font-semibold">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
          <p className="mt-2">{currentQuestion.questionText}</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`text-left p-4 border rounded-lg hover:bg-gray-200 transition-colors duration-200 
                ${userAnswers[currentQuestionIndex] === option ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100'}`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              disabled={!userAnswers[currentQuestionIndex]}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
              disabled={!userAnswers[currentQuestionIndex]}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
