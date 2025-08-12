// src/pages/KnowledgePage.js
import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const KnowledgePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You would create an API endpoint to fetch knowledge articles from your database
    const fetchArticles = async () => {
      try {
        const res = await API.get('/knowledge'); 
        setArticles(res.data);
      } catch (err) {
        console.error("Failed to fetch knowledge articles", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading knowledge...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Knowledge Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No articles available yet.</p>
        ) : (
          articles.map((article) => (
            <div key={article._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-4">Category: {article.category}</p>
              <p className="text-gray-800">{article.summary}</p>
              <a href={`/knowledge/${article._id}`} className="mt-4 inline-block text-blue-500 hover:underline">
                Read More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KnowledgePage;
