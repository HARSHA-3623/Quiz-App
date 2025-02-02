import React from 'react';
import { Timer } from './Timer';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export function Question({
  question,
  selectedAnswer,
  timeRemaining,
  onAnswer,
  onTimeUp,
  onNext,
  onPrev,
  isLastQuestion,
  isFirstQuestion,
  currentQuestionIndex,
  totalQuestions,
  score,
  answers
}) {
  return (
    <div className="flex gap-6 max-w-6xl w-full mx-auto">
      {/* Question Menu Sidebar */}
      <div className="w-64 bg-white rounded-lg shadow-lg p-6 h-fit">
        <h3 className="text-lg font-semibold mb-4">Questions</h3>
        <div className="grid grid-cols-5 gap-2">
          {[...Array(totalQuestions)].map((_, idx) => (
            <div
              key={idx}
              className={`
                w-10 h-10 rounded-lg flex items-center justify-center font-medium
                ${idx === currentQuestionIndex ? 'bg-blue-600 text-white' : 
                  answers[idx] !== undefined ? 'bg-blue-50 text-blue-600 border-2 border-blue-600' : 
                  'bg-gray-100 text-gray-600'}
              `}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Main Question Content */}
      <div className="flex-1">
        {/* Score and Timer Header */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Correct: +4</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium">Wrong: -1</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold text-blue-600">
                Score: {score}
              </div>
              <Timer timeRemaining={timeRemaining} onTimeUp={onTimeUp} />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Question {question.id}</h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-800 mb-6">{question.question}</p>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onPrev}
              disabled={isFirstQuestion}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                isFirstQuestion
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-400 text-white hover:bg-orange-500'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>
            <button
              onClick={onNext}
              disabled={selectedAnswer === null}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                selectedAnswer === null
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
              {!isLastQuestion && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}