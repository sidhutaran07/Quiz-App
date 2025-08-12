// src/components/QuizCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ quiz, status }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz/${quiz._id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4">Category: {quiz.category}</p>
      <button
        onClick={handleClick}
        className={`w-full py-2 rounded-lg ${
          status === 'Done' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
        disabled={status === 'Done'}
      >
        {status}
      </button>
    </div>
  );
};

export default QuizCard;
