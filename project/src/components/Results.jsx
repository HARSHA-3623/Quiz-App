import React from 'react';
import { Trophy, CheckCircle, XCircle, Star, Award } from 'lucide-react';

export function Results({ questions, userAnswers, score, onRestart }) {
  const totalQuestions = questions.length;
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;
  const percentage = (correctAnswers / totalQuestions) * 100;

  const getBadge = () => {
    if (percentage === 100) {
      return <Award className="w-16 h-16 text-yellow-500" />;
    } else if (percentage >= 80) {
      return <Star className="w-16 h-16 text-green-500" />;
    } else {
      return <Trophy className="w-16 h-16 text-yellow-500" />;
    }
  };

  const getMessage = () => {
    if (percentage === 100) {
      return "Perfect Score! You're a quiz master!";
    } else if (percentage >= 80) {
      return "Great job! You did really well!";
    } else if (percentage >= 50) {
      return "Good effort! Keep practicing!";
    } else {
      return "Don't give up! Try again to improve your score!";
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          {getBadge()}
        </div>
        <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-3xl font-bold text-blue-600 mb-4">Score: {score}</p>
        <p className="text-gray-600">
          You got {correctAnswers} out of {totalQuestions} questions correct
        </p>
        <p className="text-xl font-semibold text-green-600 mt-4">{getMessage()}</p>
      </div>

      <div className="space-y-6 mb-8">
        {questions.map((question, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              {userAnswers[index] === question.correctAnswer ? (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              )}
              <div>
                <p className="font-medium mb-2">{question.question}</p>
                <p className="text-sm text-gray-600">
                  Your answer: {question.options[userAnswers[index]]}
                </p>
                {userAnswers[index] !== question.correctAnswer && (
                  <p className="text-sm text-green-600">
                    Correct answer: {question.options[question.correctAnswer]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}