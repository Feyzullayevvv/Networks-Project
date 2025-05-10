import React from "react";
import { motion } from "framer-motion";

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
    className="max-w-3xl mx-auto p-8 rounded-xl bg-white/95 border border-indigo-200 shadow-xl backdrop-blur"
  >
    <h3 className="text-2xl sm:text-3xl font-semibold text-center text-slate-900 mb-8">
      ✨ {title}
    </h3>

    {showScore && (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent mb-8"
      >
        Score: {score}/{questions.length}
      </motion.div>
    )}

    <ul className="space-y-6">
      {questions.map((q, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="p-6 rounded-lg bg-white/80 border border-indigo-200 transition-all"
        >
          <p className="text-base sm:text-lg font-semibold text-slate-900 mb-4 leading-relaxed">
            <span className="text-indigo-500 font-bold">Q{i + 1}:</span>{" "}
            {q.question}
          </p>

          {type === "mcq" && (
            <>
              {userAnswers[i] === q.answer ? (
                <div className="bg-green-100 border border-green-400 text-green-800 rounded-md p-3 text-sm mb-2">
                  ✓ Correct! Your answer: {userAnswers[i]}
                </div>
              ) : (
                <>
                  <div
                    className={`rounded-md p-3 text-sm mb-2 border ${
                      userAnswers[i]
                        ? "bg-red-100 border-red-400 text-red-800"
                        : "bg-gray-100 border-gray-400 text-gray-800"
                    }`}
                  >
                    ✗{" "}
                    {userAnswers[i]
                      ? `Your answer: ${userAnswers[i]}`
                      : "Not answered"}
                  </div>
                  <div className="text-green-700 text-sm font-medium">
                    ✓ Correct answer: {q.answer}
                  </div>
                </>
              )}
            </>
          )}

          {type === "essay" && (
            <>
              <div className="bg-indigo-50 text-slate-800 border border-indigo-100 rounded-md p-3 text-sm mb-2">
                Your answer: {userAnswers[i] || "No answer provided"}
              </div>
              <div className="text-indigo-500 text-sm font-medium">
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
        className="text-center mt-10"
      >
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-400 to-indigo-500 text-white shadow transition-all"
        >
          Try Again
        </motion.button>
      </motion.div>
    )}
  </motion.div>
);

export default ReviewSection;
