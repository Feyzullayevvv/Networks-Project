import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import questionsData from "../../questions/MCQ.json";
import QuizNavigation from "../../components/QuizNavigation";
import Header from "../../components/Header";
import QuestionCard from "../../components/QuestionCard";
import ReviewSection from "../../components/ReviewSection";
import colors from "../../config/colors";
import { shuffleArray, calculateScore } from "../../utils/quiz";
import { MCQ_COUNT, QUIZ_TYPES } from "../../constants/quiz";

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    padding: "2rem 4rem",
    background: colors.background,
    color: colors.text.primary,
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  quizContainer: {
    maxWidth: "800px",
    margin: "2rem auto",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
    backdropFilter: "blur(10px)",
    border: `1px solid ${colors.card.border}`,
  },
  buttonContainer: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    padding: "0 1rem",
  },
  button: {
    padding: "1rem 3rem",
    fontSize: "1.125rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "0.75rem",
    background: colors.primary.gradient,
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
    minWidth: "140px", // Add this to maintain consistent button widths
  },
  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  headerContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    width: "100%",
  },
  navigationWrapper: {
    position: "absolute",
    right: "2rem",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
  },
};

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
      .slice(0, MCQ_COUNT)
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

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };

  const renderQuizContent = () => {
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
          <div style={styles.buttonContainer}>
            {currentQuestion > 0 && (
              <motion.button
                onClick={handlePrevious}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...styles.button,
                  background: "transparent",
                  border: `2px solid ${colors.primary.main}`,
                  color: colors.primary.main,
                }}
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
              style={{
                ...styles.button,
                ...(!userAnswers[currentQuestion] && styles.disabledButton),
              }}
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
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <Header
          title="Multiple Choice Questions"
          onBack={() => navigate("/")}
          animated={true}
        />
        <div style={styles.navigationWrapper}>
          <QuizNavigation
            questions={questions}
            currentQuestion={currentQuestion}
            userAnswers={userAnswers}
            onNavigate={setCurrentQuestion}
          />
        </div>
      </div>

      <div style={styles.quizContainer}>{renderQuizContent()}</div>
    </div>
  );
}
