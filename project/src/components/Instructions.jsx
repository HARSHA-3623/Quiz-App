import React from 'react';
import { BookOpen } from 'lucide-react';

export function Instructions({ totalQuestions, onStart }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold">Quiz Instructions</h2>
        </div>
        
        <div className="space-y-4 mb-2">
          <p className="text-gray-700">Welcome to the quiz! Here's what you need to know:</p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Total number of questions: <span className="font-semibold">{totalQuestions}</span></li>
            <li>Time per question: <span className="font-semibold">30 seconds</span></li>
            <li>Scoring:
              <ul className="list-disc list-inside ml-6">
                <li>Correct answer: <span className="text-green-600 font-semibold">+4 points</span></li>
                <li>Incorrect answer: <span className="text-red-600 font-semibold">-1 point</span></li>
              </ul>
            </li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
