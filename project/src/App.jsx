import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { Instructions } from './components/Instructions';
import { Question } from './components/Question';
import { Results } from './components/Results';

const QUIZ_QUESTIONS = [
  {
    id: 3342,
    question: "If the base sequence in DNA is 5' AAAT 3' then the base sequence in mRNA is :",
    options: ["5'UUUU3'", "3'UUUU5'", "5'AAAU3'", "3'AAAU5'"],
    correctAnswer: 2
  },
  {
    id: 3315,
    question: "Avery, MacLeod and Mc Carty used the S(virulent) and R (avirulent) strains of streptococcus pneumoniae. They isolated and purified protein, DNA, RNA from the bacteria and treated them with related enzymes. They concluded that :",
    options: ["DNA was transforming agent", "RNA was transforming agent", "Protein was transforming agent", "All are correct"],
    correctAnswer: 0
  },
  {
    id: 3381,
    question: "Identify the characteristic which is not applicable to the genetic code:",
    options: ["Non-Polar", "Non-Overlapping", "Commaless", "Universal"],
    correctAnswer: 0
  },
  {
    id: 3295,
    question: "Ribose is differentiable from deoxyribose in having :",
    options: ["Two extra oxygen", "No oxygen", "Hydroxyl group at 2nd carbon", "One extra hydrogen"],
    correctAnswer: 2
  },
  {
    id: 3356,
    question: "A DNA strand is directly involved in the synthesis of all the following except:",
    options: ["Another DNA", "t-RNA & m-RNA", "r-RNA", "Protein"],
    correctAnswer: 3
  },
  {
    id: 3343,
    question: "The genes are responsible for growth and differentiation in an organism through regulation of :",
    options: ["Translocation", "Transformation", "Transduction and translation", "Translation and transcription"],
    correctAnswer: 3
  },
  {
    id: 3316,
    question: "Genetic information is carried out by long chain molecule made up of :",
    options: ["Amino acids", "Enzymes", "Nucleotides", "Histone proteins"],
    correctAnswer: 2
  },
  {
    id: 3376,
    question: "Anticodons are found in:",
    options: ["mRNA", "tRNA", "rRNA", "In all"],
    correctAnswer: 1
  },
  {
    id: 3302,
    question: "Which of the following element is not found in nitrogenous base :",
    options: ["Nitrogen", "Hydrogen", "Carbon", "Phosphorus"],
    correctAnswer: 3
  },
  {
    id: 3378,
    question: "Transfer of genetic information from a polymer of nucleotides to a polymer of amino acids is:",
    options: ["Replication", "Transcription", "Translation", "Reverse transcription"],
    correctAnswer: 2
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