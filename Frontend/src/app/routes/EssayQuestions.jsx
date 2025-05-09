import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import QuizNavigation from "../../components/QuizNavigation";
import GradingProgress from "../../components/GradingProgress";
import EssayForm from "../../components/EssayForm";
import GradingResults from "../../components/GradingResults";
import { shuffleArray } from "../../utils/quiz";
import { GRADING_API_URL, MIN_WORDS, ESSAY_COUNT } from "../../constants/quiz";
import colors from "../../config/colors";

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
  progressBar: {
    marginBottom: "2rem",
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

export default function EssayQuestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const questionCount = location.state?.count || ESSAY_COUNT;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gradingProgress, setGradingProgress] = useState(0);
  const [graded, setGraded] = useState({});

  useEffect(() => {
    initializeQuestions();
  }, [questionCount]);

  const initializeQuestions = () => {
    const sets = [networks, os, security];
    const perSet = Math.ceil(questionCount / sets.length);
    const pool = sets.flatMap((set) => shuffleArray(set).slice(0, perSet));
    setQuestions(shuffleArray(pool).slice(0, questionCount));
  };

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const handleInputChange = (text) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: text }));
  };

  const gradeAnswer = async (idx) => {
    const answer = userAnswers[idx] || "";
    const wc = countWords(answer);

    if (wc < MIN_WORDS) {
      setGraded((prev) => ({
        ...prev,
        [idx]: `⚠️ Only ${wc} words (min ${MIN_WORDS})`,
      }));
      setGradingProgress((p) => p + 1);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(GRADING_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questions[idx].question,
          answer,
        }),
      });
      const { result } = await res.json();
      setGraded((prev) => ({ ...prev, [idx]: result || "No feedback." }));
    } catch (error) {
      setGraded((prev) => ({
        ...prev,
        [idx]: "❌ Error grading this answer.",
      }));
    } finally {
      setLoading(false);
      setGradingProgress((p) => p + 1);
    }
  };

  const handleNext = async () => {
    await gradeAnswer(currentQuestion);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    await gradeAnswer(currentQuestion);
    setSubmitted(true);
  };

  const currentText = userAnswers[currentQuestion] || "";
  const wordCount = countWords(currentText);

  const renderContent = () => {
    if (submitted) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={styles.contentContainer}
        >
          <GradingResults
            questions={questions}
            userAnswers={userAnswers}
            graded={graded}
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={styles.contentContainer}
      >
        <div style={styles.progressBar}>
          <GradingProgress
            loading={loading}
            progress={gradingProgress / questions.length}
          />
        </div>
        <EssayForm
          question={questions[currentQuestion]?.question}
          questionNumber={currentQuestion + 1}
          text={currentText}
          wordCount={wordCount}
          isLastQuestion={currentQuestion === questions.length - 1}
          loading={loading}
          onTextChange={handleInputChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          showPrevious={currentQuestion > 0}
        />
      </motion.div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <Header
          title="✍️ Short Essay Questions"
          onBack={() => navigate("/")}
          animated={true}
        />
        <div style={styles.navigationWrapper}>
          <QuizNavigation
            questions={questions}
            currentQuestion={currentQuestion}
            userAnswers={userAnswers}
            onNavigate={(i) =>
              i >= 0 && i < questions.length && setCurrentQuestion(i)
            }
          />
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
