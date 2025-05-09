import React from "react";
import { motion } from "framer-motion";
import colors from "../config/colors";
const styles = {
  container: {
    maxWidth: 800,
    margin: "auto",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "2.5rem",
    borderRadius: "1.25rem",
  },
  resultCard: {
    background: "rgba(255, 255, 255, 0.98)",
    padding: "1.75rem",
    borderRadius: "1rem",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.08)",
    marginBottom: "1.25rem",
  },
  header: {
    color: "#6366f1",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "2.5rem",
    background: colors.primary.gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "2rem",
    color: colors.text.primary,
  },
  question: {
    fontSize: "1.15rem",
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: "1.25rem",
  },
  answer: {
    background: "rgba(99, 102, 241, 0.03)",
    padding: "1.25rem",
    borderRadius: "0.75rem",
    marginBottom: "1rem",
  },
  answerLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: colors.text.secondary,
    fontSize: "0.9rem",
    fontWeight: "500",
    marginBottom: "0.75rem",
  },
  answerText: {
    color: colors.text.primary,
    lineHeight: "1.6",
    fontSize: "1rem",
  },
  feedback: {
    background: "rgba(99, 102, 241, 0.02)",
    padding: "1.25rem",
    borderRadius: "0.75rem",
    marginTop: "1rem",
  },
  feedbackLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: colors.primary.main,
    fontSize: "0.9rem",
    fontWeight: "600",
    marginBottom: "0.75rem",
  },
  feedbackText: {
    color: colors.text.secondary,
    lineHeight: "1.6",
  },
};

const GradingResults = ({ questions, userAnswers, graded }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    style={styles.container}
  >
    <h2 style={styles.header}>✨ Your answers have been submitted!</h2>
    <h3 style={styles.sectionTitle}>
      <span>Grading Results</span>
    </h3>

    {questions.map((q, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 8px 30px rgba(99, 102, 241, 0.12)",
        }}
        style={styles.resultCard}
      >
        <div style={styles.question}>
          <span>Q{i + 1}:</span> {q.question}
        </div>

        <div style={styles.answer}>
          <div style={styles.answerLabel}>
            <span>✍️</span>
            <span>Your Answer</span>
          </div>
          <div style={styles.answerText}>
            {userAnswers[i] || "No answer provided"}
          </div>
        </div>

        <div style={styles.feedback}>
          <div style={styles.feedbackLabel}>
            <span>💡</span>
            <span>Feedback</span>
          </div>
          <div style={styles.feedbackText}>
            {graded[i] || "No feedback available"}
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default GradingResults;
