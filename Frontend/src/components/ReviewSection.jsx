import React from "react";
import { motion } from "framer-motion";
import colors from "../config/colors";

const styles = {
  container: {
    maxWidth: 800,
    margin: "auto",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
  },
  header: {
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "1.75rem",
    fontWeight: "600",
  },
  score: {
    background: colors.primary.gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "2rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "2rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  item: {
    background: "rgba(255, 255, 255, 0.8)",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    transition: "all 0.2s ease",
  },
  question: {
    color: colors.text.primary,
    marginBottom: "1rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    lineHeight: "1.5",
  },
  answer: {
    color: colors.text.secondary,
    marginBottom: "0.5rem",
    fontSize: "1rem",
    padding: "0.75rem",
    background: "rgba(99, 102, 241, 0.05)",
    borderRadius: "0.5rem",
    border: "1px solid rgba(99, 102, 241, 0.1)",
  },
  feedback: {
    color: colors.primary.main,
    marginTop: "0.75rem",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "2rem",
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
  },
};

const ReviewSection = ({
  title = "Quiz Completed",
  questions,
  userAnswers,
  score,
  feedback,
  onRestart,
  showScore = true,
  type = "mcq",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    style={styles.container}
  >
    <h3 style={styles.header}>✨ {title}</h3>

    {showScore && (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={styles.score}
      >
        Score: {score}/{questions.length}
      </motion.div>
    )}

    <ul style={styles.list}>
      {questions.map((q, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          style={styles.item}
        >
          <p style={styles.question}>
            <span style={{ color: colors.primary.main }}>Q{i + 1}:</span>{" "}
            {q.question}
          </p>

          {type === "mcq" && (
            <>
              <div style={styles.answer}>
                Your answer: {userAnswers[i] || "Not answered"}
              </div>
              <div style={styles.feedback}>✓ Correct answer: {q.answer}</div>
            </>
          )}

          {type === "essay" && (
            <>
              <div style={styles.answer}>
                Your answer: {userAnswers[i] || "No answer provided"}
              </div>
              <div style={styles.feedback}>
                AI Feedback: {feedback[i] || "Not graded"}
              </div>
            </>
          )}
        </motion.li>
      ))}
    </ul>

    {onRestart && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        style={styles.buttonContainer}
      >
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={styles.button}
        >
          Try Again
        </motion.button>
      </motion.div>
    )}
  </motion.div>
);

export default ReviewSection;
