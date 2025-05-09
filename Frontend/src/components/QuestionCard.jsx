import React from "react";
import { motion } from "framer-motion";
import { QUIZ_TYPES } from "../constants/quiz";

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
    className="p-8 mb-6 rounded-xl bg-white/95 backdrop-blur border border-[rgba(99,102,241,0.2)] shadow-[0_4px_20px_rgba(99,102,241,0.1)]"
  >
    <h3 className="text-xl font-semibold leading-relaxed text-[#1e1b4b] mb-8">
      {index + 1}. {question.question}
    </h3>
    <div className="flex flex-col gap-3">
      {question.options.map((option, i) => (
        <motion.div
          key={i}
          whileHover={selectedOption !== option ? { scale: 1.02, y: -2 } : {}}
          whileTap={{ scale: 0.98 }}
          onClick={() => onOptionClick(option)}
          className={`px-6 py-4 rounded-xl border text-base font-medium transition-all duration-200 cursor-pointer select-none relative overflow-hidden 
            ${
              selectedOption === option
                ? "bg-[linear-gradient(135deg,#818cf8_0%,#6366f1_100%)] text-white border-none shadow-md"
                : "bg-white/90 text-[#1e1b4b] border-[rgba(99,102,241,0.2)] hover:border-[#6366f1] hover:bg-[rgba(99,102,241,0.1)]"
            }`}
        >
          {option}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default QuestionCard;
