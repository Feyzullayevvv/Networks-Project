import React from "react";
import { motion } from "framer-motion";

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
    className="max-w-3xl mx-auto p-8 rounded-xl bg-white/95 border border-indigo-200 shadow-xl backdrop-blur flex flex-col items-center"
  >
    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 w-full mb-6 leading-relaxed">
      {questionNumber}. {question}
    </h3>

    <textarea
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
      placeholder="Write your answer here (minimum 100 words)..."
      className="w-full min-h-[200px] p-4 text-base rounded-lg border border-indigo-200 bg-white/90 text-slate-900 resize-y outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
    />

    <div
      className={`w-full text-right mt-3 text-sm font-medium ${
        wordCount < 100 ? "text-red-500" : "text-green-500"
      }`}
    >
      {wordCount < 100
        ? `${wordCount}/100 words required`
        : `✓ ${wordCount} words`}
    </div>

    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {showPrevious && (
        <motion.button
          onClick={onPrevious}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 text-base font-semibold rounded-lg border-2 border-indigo-500 text-indigo-500 bg-transparent shadow transition-all"
        >
          Previous
        </motion.button>
      )}
      <motion.button
        onClick={isLastQuestion ? onSubmit : onNext}
        disabled={wordCount < 100 || loading}
        whileHover={wordCount >= 100 && !loading ? { scale: 1.02, y: -2 } : {}}
        whileTap={wordCount >= 100 && !loading ? { scale: 0.98 } : {}}
        className={`px-6 py-3 text-base font-semibold rounded-lg shadow transition-all min-w-[140px] ${
          wordCount >= 100 && !loading
            ? "bg-gradient-to-r from-indigo-400 to-indigo-500 text-white"
            : "bg-gray-300 text-white cursor-not-allowed"
        }`}
      >
        {isLastQuestion ? "Submit" : "Next"}
      </motion.button>
    </div>
  </motion.div>
);

export default EssayForm;
