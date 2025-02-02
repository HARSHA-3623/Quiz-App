import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { Instructions } from './components/Instructions';
import { Question } from './components/Question';
import { Results } from './components/Results';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3
  },
  {
    id: 5,
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Copper", "Aluminum"],
    correctAnswer: 1
  }
];

const INITIAL_STATE = {
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  timeRemaining: 30,
  isQuizStarted: false,
  isQuizCompleted: false,
};

function QuizContent() {
  const [state, setState] = useState(INITIAL_STATE);

  React.useEffect(() => {
    let timer;
    if (state.isQuizStarted && !state.isQuizCompleted && state.timeRemaining > 0) {
      timer = window.setInterval(() => {
        setState(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state.isQuizStarted, state.isQuizCompleted, state.timeRemaining]);

  const handleStart = () => {
    setState(prev => ({ ...prev, isQuizStarted: true }));
  };

  const handleAnswer = (answerIndex) => {
    setState(prev => ({
      ...prev,
      answers: [
        ...prev.answers.slice(0, prev.currentQuestionIndex),
        answerIndex,
        ...prev.answers.slice(prev.currentQuestionIndex + 1),
      ],
    }));
  };

  const handleNext = () => {
    const currentQuestion = QUIZ_QUESTIONS[state.currentQuestionIndex];
    const currentAnswer = state.answers[state.currentQuestionIndex];
    const scoreChange = currentAnswer === currentQuestion.correctAnswer ? 4 : -1;

    setState(prev => {
      const isLastQuestion = prev.currentQuestionIndex === QUIZ_QUESTIONS.length - 1;
      return {
        ...prev,
        score: prev.score + scoreChange,
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        timeRemaining: 30,
        isQuizCompleted: isLastQuestion,
      };
    });
  };

  const handlePrev = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1),
      timeRemaining: 30,
    }));
  };

  const handleRestart = () => {
    setState(INITIAL_STATE);
  };

  if (!state.isQuizStarted) {
    return (
      <Instructions
        totalQuestions={QUIZ_QUESTIONS.length}
        onStart={handleStart}
      />
    );
  }

  if (state.isQuizStarted && !state.isQuizCompleted) {
    return (
      <Question
        question={QUIZ_QUESTIONS[state.currentQuestionIndex]}
        selectedAnswer={state.answers[state.currentQuestionIndex] ?? null}
        timeRemaining={state.timeRemaining}
        onAnswer={handleAnswer}
        onTimeUp={handleNext}
        onNext={handleNext}
        onPrev={handlePrev}
        isLastQuestion={state.currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
        isFirstQuestion={state.currentQuestionIndex === 0}
        currentQuestionIndex={state.currentQuestionIndex}
        totalQuestions={QUIZ_QUESTIONS.length}
        score={state.score}
        answers={state.answers}
      />
    );
  }

  return (
    <Results
      questions={QUIZ_QUESTIONS}
      userAnswers={state.answers}
      score={state.score}
      onRestart={handleRestart}
    />
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instructions" element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
              <QuizContent />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;