import React from "react";
import { motion } from "framer-motion";

const QuizNavigation = ({
  questions,
  currentQuestion,
  userAnswers,
  onNavigate,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 p-3 bg-white/90 backdrop-blur rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] max-w-[300px]"
    >
      {questions.map((_, idx) => {
        const isAnswered = !!userAnswers[idx];
        const isCurrent = currentQuestion === idx;

        return (
          <motion.div
            key={idx}
            onClick={() => onNavigate(idx)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-8 h-8 rounded-md flex items-center justify-center cursor-pointer text-sm font-semibold transition-all border-2
              ${
                isAnswered
                  ? "bg-[linear-gradient(135deg,#818cf8_0%,#6366f1_100%)] text-white border-none"
                  : "bg-transparent text-[#1e1b4b] border-[#818cf8]"
              }
              ${
                isCurrent
                  ? "shadow-[0_0_12px_#818cf8] bg-[rgba(99,102,241,0.1)]"
                  : ""
              }`}
          >
            {idx + 1}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default QuizNavigation;
