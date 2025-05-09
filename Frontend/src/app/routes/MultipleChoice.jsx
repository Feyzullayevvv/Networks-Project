import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import questionsData from "../../questions/MCQ.json";
import QuizNavigation from "../../components/QuizNavigation";
import Header from "../../components/Header";
import QuestionCard from "../../components/QuestionCard";
import ReviewSection from "../../components/ReviewSection";
import { shuffleArray, calculateScore } from "../../utils/quiz";
import { MCQ_COUNT, QUIZ_TYPES } from "../../constants/quiz";

export default function MultipleChoice() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Get previously shown questions from localStorage
  const getShownQuestions = () => {
    const shown = localStorage.getItem("shownMCQs");
    return shown ? JSON.parse(shown) : [];
  };

  // Update shown questions in localStorage
  const updateShownQuestions = (newQuestions) => {
    const shown = getShownQuestions();
    const updated = [...shown, ...newQuestions.map((q) => q.id)];

    // Reset if we've shown all questions
    if (updated.length >= questionsData.length) {
      localStorage.setItem("shownMCQs", JSON.stringify([]));
      return [];
    }

    localStorage.setItem("shownMCQs", JSON.stringify(updated));
    return updated;
  };
  useEffect(() => {
    if (questions.length === 0) {
      initializeQuiz();
    }
  }, []);
  const initializeQuiz = () => {
    const selectedQuestions = selectRandomQuestions();
    setQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setUserAnswers({});
    setSubmitted(false);
  };

  // Enhanced shuffle and selection
  const selectRandomQuestions = () => {
    const shownQuestionIds = getShownQuestions();
    const availableQuestions = questionsData.filter(
      (q) => !shownQuestionIds.includes(q.id)
    );

    // If running low on new questions, reset the shown questions
    if (availableQuestions.length < MCQ_COUNT) {
      localStorage.setItem("shownMCQs", JSON.stringify([]));
      return shuffleArray([...questionsData])
        .slice(0, MCQ_COUNT)
        .map((q) => ({ ...q, options: shuffleArray([...q.options]) }));
    }

    // Select random questions from available ones
    const selectedQuestions = shuffleArray([...availableQuestions])
      .slice(0, MCQ_COUNT)
      .map((q) => ({ ...q, options: shuffleArray([...q.options]) }));

    // Update shown questions in localStorage
    updateShownQuestions(selectedQuestions);

    return selectedQuestions;
  };

  const resetQuiz = () => {
    initializeQuiz();
  };

  const handleOptionClick = (option) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const renderQuizContent = () => {
    if (questions.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-8"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </motion.div>
      );
    }
    if (!submitted && questions.length > 0 && questions[currentQuestion]) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <QuestionCard
            question={questions[currentQuestion]}
            index={currentQuestion}
            selectedOption={userAnswers[currentQuestion]}
            onOptionClick={handleOptionClick}
            type={QUIZ_TYPES.MCQ}
          />
          <div className="mt-8 flex justify-center gap-4 px-4">
            {currentQuestion > 0 && (
              <motion.button
                onClick={handlePrevious}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 text-lg font-semibold rounded-lg border-2 border-indigo-500 text-indigo-500 bg-transparent shadow"
              >
                Previous
              </motion.button>
            )}
            <motion.button
              onClick={
                currentQuestion === questions.length - 1
                  ? handleSubmit
                  : handleNext
              }
              disabled={!userAnswers[currentQuestion]}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 text-lg font-semibold rounded-lg shadow transition-all min-w-[140px] ${
                userAnswers[currentQuestion]
                  ? "bg-gradient-to-r from-indigo-400 to-indigo-500 text-white"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
            </motion.button>
          </div>
        </motion.div>
      );
    }

    return (
      <ReviewSection
        title="MCQ Quiz Completed"
        questions={questions}
        userAnswers={userAnswers}
        score={calculateScore(questions, userAnswers)}
        onRestart={resetQuiz}
        type={QUIZ_TYPES.MCQ}
      />
    );
  };

  return (
    <div className="min-h-screen px-8 py-12 bg-gradient-to-br from-indigo-50 to-indigo-100 font-inter text-slate-900">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 relative gap-4">
        <Header
          title="Multiple Choice Questions"
          onBack={() => navigate("/")}
          animated={true}
        />
        <div className="flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-10">
          <QuizNavigation
            questions={questions}
            currentQuestion={currentQuestion}
            userAnswers={userAnswers}
            onNavigate={setCurrentQuestion}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white bg-opacity-90 p-8 rounded-xl shadow-xl border border-indigo-200 backdrop-blur">
        {renderQuizContent()}
      </div>
    </div>
  );
}
