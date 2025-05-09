import React from "react";
import { motion } from "framer-motion";
import colors from "../config/colors";

const styles = {
  container: {
    maxWidth: 800,
    margin: "auto",
    padding: "2rem",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
  },
  question: {
    color: colors.text.primary,
    width: "100%",
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },
  textarea: {
    width: "100%",
    minHeight: "200px",
    padding: "1rem",
    background: "rgba(255, 255, 255, 0.9)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    borderRadius: "0.75rem",
    color: colors.text.primary,
    fontSize: "1rem",
    lineHeight: "1.6",
    resize: "vertical",
    transition: "all 0.2s ease",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    "&:focus": {
      outline: "none",
      borderColor: colors.primary.main,
      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)",
    },
  },
  wordCount: {
    width: "100%",
    textAlign: "right",
    marginTop: "0.75rem",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: "2rem",
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
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
  outlineButton: {
    background: "transparent",
    border: `2px solid ${colors.primary.main}`,
    color: colors.primary.main,
  },
  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

const EssayForm = ({
  question,
  questionNumber,
  text,
  wordCount,
  isLastQuestion,
  loading,
  onTextChange,
  onNext,
  onSubmit,
  onPrevious,
  showPrevious,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    style={styles.container}
  >
    <h3 style={styles.question}>
      {questionNumber}. {question}
    </h3>

    <textarea
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
      placeholder="Write your answer here (minimum 100 words)..."
      style={styles.textarea}
    />

    <div
      style={{
        ...styles.wordCount,
        color: wordCount < 100 ? "#ef4444" : "#22c55e",
      }}
    >
      {wordCount < 100
        ? `${wordCount}/100 words required`
        : `✓ ${wordCount} words`}
    </div>

    <div style={styles.buttonContainer}>
      {showPrevious && (
        <motion.button
          onClick={onPrevious}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            ...styles.button,
            ...styles.outlineButton,
          }}
        >
          Previous
        </motion.button>
      )}
      <motion.button
        onClick={isLastQuestion ? onSubmit : onNext}
        disabled={wordCount < 100 || loading}
        whileHover={wordCount >= 100 ? { scale: 1.02, y: -2 } : {}}
        whileTap={wordCount >= 100 ? { scale: 0.98 } : {}}
        style={{
          ...styles.button,
          ...(wordCount < 100 && styles.disabledButton),
        }}
      >
        {isLastQuestion ? "Submit" : "Next"}
      </motion.button>
    </div>
  </motion.div>
);

export default EssayForm;
