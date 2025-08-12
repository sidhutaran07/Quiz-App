// src/components/CategoryCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    // You can navigate to a list of quizzes for this category
    // or directly to a popular quiz in this category.
    // For this example, let's assume we navigate to a quizzes list.
    navigate(`/quizzes/category/${category.name}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold text-center mb-4">{category.name}</h3>
      <div className="flex justify-center">
        {/* Placeholder for an icon, you can use a library like react-icons */}
        <span className="text-4xl">💡</span> 
      </div>
      <button 
        onClick={handleStart}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
      >
        Explore Quizzes
      </button>
    </div>
  );
};

export default CategoryCard;
