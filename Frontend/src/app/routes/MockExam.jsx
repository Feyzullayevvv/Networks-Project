import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import QuizNavigation from "../../components/QuizNavigation";
import QuestionCard from "../../components/QuestionCard";
import ReviewSection from "../../components/ReviewSection";
import GradingProgress from "../../components/GradingProgress";
import PrimaryButton from "../../components/PrimaryButton";
import EssayForm from "../../components/EssayForm";
import { shuffleArray } from "../../utils/quiz";
import { GRADING_API_URL, MIN_WORDS } from "../../constants/quiz";
import colors from "../../config/colors";

import mcq from "../../questions/MCQ.json";
import networks from "../../questions/NetworksEssay.json";
import os from "../../questions/OperatingSystemsEssay.json";
import security from "../../questions/SecurityEssay.json";

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    padding: "2rem 4rem",
    background: colors.background,
    color: colors.text.primary,
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
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
  contentContainer: {
    maxWidth: "800px",
    margin: "2rem auto",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
  },
  buttonContainer: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
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
    minWidth: "140px",
  },
  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  progressBar: {
    marginBottom: "2rem",
    padding: "1rem",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "0.75rem",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    backdropFilter: "blur(8px)",
  },
};

export default function MockExam() {
  const navigate = useNavigate();

  // MCQ state
  const [mcqs, setMcqs] = useState([]);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqScore, setMcqScore] = useState(0);

  // Essay state
  const [essayQuestions, setEssayQuestions] = useState([]);
  const [essayAnswers, setEssayAnswers] = useState({});
  const [graded, setGraded] = useState({});

  // Shared state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [section, setSection] = useState("mcq");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Constants
  const mcqCount = 14;
  const essayPerTopic = 2;

  useEffect(() => {
    initializeQuestions();
  }, []);

  const initializeQuestions = () => {
    // Initialize MCQs
    setMcqs(
      shuffleArray(mcq)
        .slice(0, mcqCount)
        .map((q) => ({ ...q, options: shuffleArray(q.options) }))
    );

    // Initialize Essays
    const selectedEssays = [
      ...shuffleArray(networks).slice(0, essayPerTopic),
      ...shuffleArray(os).slice(0, essayPerTopic),
      ...shuffleArray(security).slice(0, essayPerTopic),
    ];
    setEssayQuestions(shuffleArray(selectedEssays));
  };

  // MCQ Handlers
  const handleMcqAnswer = (answer) => {
    setMcqAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleMCQNext = () => {
    if (currentQuestion < mcqs.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleMCQSubmit = () => {
    const score = Object.entries(mcqAnswers).filter(
      ([idx, answer]) => mcqs[parseInt(idx)].answer === answer
    ).length;
    setMcqScore(score);
    setSection("essay");
    setCurrentQuestion(0);
  };

  // Essay Handlers
  const handleEssayChange = (text) => {
    setEssayAnswers((prev) => ({ ...prev, [currentQuestion]: text }));
  };

  const handleEssayNext = async () => {
    const answer = essayAnswers[currentQuestion];
    const wordCount = answer?.trim().split(/\s+/).filter(Boolean).length || 0;

    if (wordCount < MIN_WORDS) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(GRADING_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: essayQuestions[currentQuestion].question,
          answer,
        }),
      });

      const { result } = await response.json();
      setGraded((prev) => ({ ...prev, [currentQuestion]: result }));

      if (currentQuestion === essayQuestions.length - 1) {
        setSubmitted(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Grading failed:", error);
      setGraded((prev) => ({
        ...prev,
        [currentQuestion]: "Failed to grade answer",
      }));
    } finally {
      setLoading(false);
    }
  };

  const renderMCQSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.contentContainer}
    >
      {mcqs[currentQuestion] && (
        <QuestionCard
          question={mcqs[currentQuestion]}
          index={currentQuestion}
          selectedOption={mcqAnswers[currentQuestion]}
          onOptionClick={handleMcqAnswer}
        />
      )}
      <div style={styles.buttonContainer}>
        <motion.button
          onClick={
            currentQuestion === mcqs.length - 1
              ? handleMCQSubmit
              : handleMCQNext
          }
          disabled={!mcqAnswers[currentQuestion]}
          whileHover={mcqAnswers[currentQuestion] ? { scale: 1.02, y: -2 } : {}}
          whileTap={mcqAnswers[currentQuestion] ? { scale: 0.98 } : {}}
          style={{
            ...styles.button,
            ...(!mcqAnswers[currentQuestion] && styles.disabledButton),
          }}
        >
          {currentQuestion === mcqs.length - 1 ? "Start Essays" : "Next"}
        </motion.button>
      </div>
    </motion.div>
  );

  const renderEssaySection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.contentContainer}
    >
      {loading && (
        <div style={styles.progressBar}>
          <GradingProgress />
        </div>
      )}
      <EssayForm
        question={essayQuestions[currentQuestion]?.question}
        questionNumber={currentQuestion + 1}
        text={essayAnswers[currentQuestion] || ""}
        wordCount={
          (essayAnswers[currentQuestion] || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean).length
        }
        isLastQuestion={currentQuestion === essayQuestions.length - 1}
        loading={loading}
        onTextChange={handleEssayChange}
        onNext={handleEssayNext}
        onSubmit={handleEssayNext}
      />
    </motion.div>
  );

  const renderResults = () => (
    <ReviewSection
      title="Mock Exam Completed"
      mcqQuestions={mcqs}
      mcqAnswers={mcqAnswers}
      mcqScore={mcqScore}
      essayQuestions={essayQuestions}
      essayAnswers={essayAnswers}
      essayFeedback={graded}
      type="mock"
    />
  );

  const renderContent = () => {
    if (submitted) return renderResults();
    if (section === "mcq") return renderMCQSection();
    return renderEssaySection();
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <Header
          title="Mock Exam"
          onBack={() => navigate("/")}
          animated={true}
        />
        <div style={styles.navigationWrapper}>
          <QuizNavigation
            questions={section === "mcq" ? mcqs : essayQuestions}
            currentQuestion={currentQuestion}
            userAnswers={section === "mcq" ? mcqAnswers : essayAnswers}
            onNavigate={(i) => {
              const questions = section === "mcq" ? mcqs : essayQuestions;
              if (i >= 0 && i < questions.length) {
                setCurrentQuestion(i);
              }
            }}
          />
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
