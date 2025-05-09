import React from "react";
import { motion } from "framer-motion";
import colors from "../config/colors";

const styles = {
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    padding: "0.75rem",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    maxWidth: "300px", // Reduced max width
  },
  dot: {
    width: "2rem",
    height: "2rem",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: `2px solid ${colors.primary.light}`,
    background: "transparent",
    color: colors.text.primary,
    fontSize: "0.875rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  answered: {
    background: colors.primary.gradient,
    color: "#ffffff",
    border: "none",
  },
  current: {
    borderColor: colors.primary.main,
    boxShadow: `0 0 12px ${colors.primary.light}`,
    background: "rgba(99, 102, 241, 0.1)",
  },
};

const QuizNavigation = ({
  questions,
  currentQuestion,
  userAnswers,
  onNavigate,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    style={styles.nav}
  >
    {questions.map((_, idx) => (
      <motion.div
        key={idx}
        onClick={() => onNavigate(idx)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          ...styles.dot,
          ...(userAnswers[idx] ? styles.answered : {}),
          ...(currentQuestion === idx ? styles.current : {}),
        }}
      >
        {idx + 1}
      </motion.div>
    ))}
  </motion.div>
);

export default QuizNavigation;
