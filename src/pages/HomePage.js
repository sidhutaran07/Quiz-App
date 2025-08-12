// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import CategoryCard from '../components/CategoryCard';
import QuizCard from '../components/QuizCard';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [quizzesTaken, setQuizzesTaken] = useState([]);
  // CHANGE 1: Add a new state variable to store all quizzes
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // CHANGE 2: Fetch all quizzes in addition to categories and quizzesTaken
        const [categoriesRes, quizzesTakenRes, allQuizzesRes] = await Promise.all([
          API.get('/quizzes/categories'),
          API.get('/user/quizzes'),
          API.get('/quizzes')
        ]);
        setCategories(categoriesRes.data);
        setQuizzesTaken(quizzesTakenRes.data);
        // CHANGE 3: Set the allQuizzes state
        setAllQuizzes(allQuizzesRes.data); 
      } catch (err) {
        console.error("Failed to fetch homepage data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading quizzes...</div>;

  const getQuizStatus = (quizId) => {
    return quizzesTaken.find(q => q.quizId === quizId) ? "Done" : "Start Quiz";
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Quiz App!</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(category => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Quizzes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* CHANGE 4: The example code is now uncommented and uses the 'allQuizzes' state */}
          {allQuizzes.map(quiz => (
            <QuizCard 
              key={quiz._id} 
              quiz={quiz} 
              status={getQuizStatus(quiz._id)} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
