import React from "react";
import { motion } from "framer-motion";

const GradingResults = ({ questions, userAnswers, graded }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="max-w-3xl mx-auto bg-white/95 p-10 rounded-2xl shadow-md backdrop-blur"
  >
    <h2 className="text-center text-4xl font-bold mb-10 bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
      ✨ Your answers have been submitted!
    </h2>
    <h3 className="text-2xl font-semibold text-slate-900 mb-8 flex items-center gap-3">
      <span>Grading Results</span>
    </h3>

    {questions.map((q, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        whileHover={{ scale: 1.01 }}
        className="bg-white p-7 rounded-xl border border-indigo-200 shadow hover:shadow-lg mb-5 transition-all"
      >
        <div className="text-lg font-semibold text-slate-900 mb-5">
          <span className="text-indigo-500 font-bold">Q{i + 1}:</span>{" "}
          {q.question}
        </div>

        <div className="bg-indigo-50 p-5 rounded-lg mb-4">
          <div className="text-indigo-700 text-sm font-medium mb-2 flex items-center gap-2">
            <span>✍️</span>
            <span>Your Answer</span>
          </div>
          <div className="text-slate-800 leading-relaxed text-base">
            {userAnswers[i] || "No answer provided"}
          </div>
        </div>

        <div className="bg-indigo-100 p-5 rounded-lg">
          <div className="text-indigo-600 text-sm font-semibold mb-2 flex items-center gap-2">
            <span>💡</span>
            <span>Feedback</span>
          </div>
          {graded[i] && typeof graded[i] === "object" ? (
            <div className="text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>Score:</strong> {graded[i].score}
              </p>
              <p>
                <strong>Feedback:</strong> {graded[i].feedback}
              </p>
              <div>
                <p className="font-medium">Model Answer:</p>
                <p className="italic text-slate-600">
                  {graded[i].model_answer}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-slate-700 leading-relaxed">
              {graded[i] || "No feedback available"}
            </div>
          )}
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default GradingResults;
