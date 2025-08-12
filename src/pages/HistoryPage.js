// src/pages/HistoryPage.js
import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get('/user/history');
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading history...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Quiz History</h1>
      {history.length === 0 ? (
        <p className="text-center text-gray-600">You haven't taken any quizzes yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Quiz Title</th>
                <th className="py-3 px-6 text-left">Score</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {history.map((record) => (
                <tr key={record.quizId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{record.quizTitle}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                      {record.score}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <Link to={`/results/${record.quizId}`} className="text-blue-500 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
