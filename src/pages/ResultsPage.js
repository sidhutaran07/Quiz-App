// src/pages/ResultsPage.js
import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

const ResultsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { score } = location.state || {}; // Destructure score, provide a default

  if (score === undefined) {
    return (
      <div className="text-center mt-8">
        <p>Results not found. Please take the quiz again.</p>
        <Link to={`/quiz/${id}`} className="text-blue-500 hover:underline">
          Go back to quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
        <p className="text-xl mb-2">You scored:</p>
        <div className="text-6xl font-extrabold text-blue-600 my-4">
          {score}
        </div>
        <p className="text-lg">Correct answers out of {score} questions.</p>
        <Link 
          to="/" 
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;
