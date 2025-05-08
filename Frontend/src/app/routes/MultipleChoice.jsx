import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import questionsData from "../../questions/MCQ.json";
import QuizNavigation from "./../../components/QuizNavigation";
import PrimaryButton from "./../../components/PrimaryButton";
import QuestionCard from "./../../components/QuestionCard";
import ReviewSection from "./../../components/ReviewSection";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function MultipleChoice() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    resetQuiz();
  }, []);

  const resetQuiz = () => {
    const shuffled = shuffleArray(questionsData)
      .slice(0, 14)
      .map((q) => ({ ...q, options: shuffleArray(q.options) }));
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setUserAnswers({});
    setSubmitted(false);
  };

  const handleOptionClick = (option) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = Object.entries(userAnswers).filter(
    ([index, answer]) => questions[parseInt(index)].answer === answer
  ).length;

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#0b0c1a",
        minHeight: "100vh",
        padding: "2rem",
        color: "#e0e1f5",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/** Main Page button **/}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 10,
        }}
      >
        <PrimaryButton onClick={() => navigate("/")}>Main Page</PrimaryButton>
      </div>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#00ffcc",
          fontSize: "2.5rem",
        }}
      >
        MCQ
      </motion.h2>

      <QuizNavigation
        questions={questions}
        currentQuestion={currentQuestion}
        userAnswers={userAnswers}
        onNavigate={setCurrentQuestion}
      />

      <div
        style={{
          maxWidth: 800,
          margin: "2rem auto",
          background: "#1e213a",
          padding: "2rem",
          borderRadius: 12,
        }}
      >
        {!submitted && questions.length > 0 && questions[currentQuestion] ? (
          <>
            <QuestionCard
              question={questions[currentQuestion]}
              index={currentQuestion}
              selectedOption={userAnswers[currentQuestion]}
              onOptionClick={handleOptionClick}
            />
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              {currentQuestion === questions.length - 1 ? (
                <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
              ) : (
                <PrimaryButton
                  onClick={handleNext}
                  disabled={!userAnswers[currentQuestion]}
                >
                  Next
                </PrimaryButton>
              )}
            </div>
          </>
        ) : (
          <ReviewSection
            questions={questions}
            userAnswers={userAnswers}
            score={score}
            onRestart={resetQuiz}
          />
        )}
      </div>
    </div>
  );
}
