import React from "react";
import { motion } from "framer-motion";

export default function QuestionCard({
  question,
  index,
  selectedOption,
  onOptionClick,
}) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "#1e213a",
        padding: "1.5rem",
        borderRadius: "12px",
        marginBottom: "1rem",
      }}
    >
      <h3 style={{ color: "#e0e1f5", marginBottom: "1rem" }}>
        {index + 1}. {question.question}
      </h3>
      {question.options.map((option) => {
        const isSelected = selectedOption === option;
        return (
          <motion.button
            key={option}
            onClick={() => onOptionClick(option)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem 1rem",
              margin: "0.5rem 0",
              background: isSelected
                ? "linear-gradient(135deg, #00ffcc, #009999)"
                : "#2a2d42",
              color: isSelected ? "#000" : "#e0e1f5",
              border: isSelected ? "none" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 500,
              transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
              boxShadow: isSelected ? "0 0 12px rgba(0,255,204,0.6)" : "none",
            }}
          >
            {option}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
