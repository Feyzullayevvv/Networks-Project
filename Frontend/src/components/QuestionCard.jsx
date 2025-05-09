import React from "react";
import { motion } from "framer-motion";
import { QUIZ_TYPES } from "../constants/quiz";
import colors from "../config/colors";

const styles = {
  container: {
    padding: "2rem",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "1rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
  },
  question: {
    color: colors.text.primary,
    fontSize: "1.25rem",
    marginBottom: "2rem",
    fontWeight: "600",
    lineHeight: "1.6",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  option: {
    padding: "1rem 1.5rem",
    borderRadius: "0.75rem",
    cursor: "pointer",
    border: `1px solid rgba(99, 102, 241, 0.2)`,
    background: "rgba(255, 255, 255, 0.9)",
    color: colors.text.primary,
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    userSelect: "none",
    position: "relative",
    overflow: "hidden",
  },
  selectedOption: {
    background: colors.primary.gradient,
    color: "#ffffff",
    border: "none",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
  },
  hoverOption: {
    border: `1px solid ${colors.primary.main}`,
    background: "rgba(99, 102, 241, 0.1)",
  },
};

const QuestionCard = ({
  question,
  index,
  selectedOption,
  onOptionClick,
  type = QUIZ_TYPES.MCQ,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    style={styles.container}
  >
    <h3 style={styles.question}>
      {index + 1}. {question.question}
    </h3>
    <div style={styles.optionsContainer}>
      {question.options.map((option, i) => (
        <motion.div
          key={i}
          whileHover={selectedOption !== option ? { scale: 1.02, y: -2 } : {}}
          whileTap={{ scale: 0.98 }}
          onClick={() => onOptionClick(option)}
          style={{
            ...styles.option,
            ...(selectedOption === option && styles.selectedOption),
          }}
        >
          {option}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default QuestionCard;
