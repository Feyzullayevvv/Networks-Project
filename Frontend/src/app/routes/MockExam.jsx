import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import QuizNavigation from "../../components/QuizNavigation";
import QuestionCard from "../../components/QuestionCard";
import ReviewSection from "../../components/ReviewSection";
import GradingProgress from "../../components/GradingProgress";
import EssayForm from "../../components/EssayForm";
import { shuffleArray } from "../../utils/quiz";
import { GRADING_API_URL, MIN_WORDS } from "../../constants/quiz";

import mcq from "../../questions/MCQ.json";
import networks from "../../questions/NetworksEssay.json";
import os from "../../questions/OperatingSystemsEssay.json";
import security from "../../questions/SecurityEssay.json";

export default function MockExam() {
  const navigate = useNavigate();

  const [mcqs, setMcqs] = useState([]);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqScore, setMcqScore] = useState(0);

  const [essayQuestions, setEssayQuestions] = useState([]);
  const [essayAnswers, setEssayAnswers] = useState({});
  const [graded, setGraded] = useState({});

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [section, setSection] = useState("mcq");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const mcqCount = 14;
  const essayPerTopic = 2;

  useEffect(() => {
    const shuffledMcqs = shuffleArray(mcq)
      .slice(0, mcqCount)
      .map((q) => ({ ...q, options: shuffleArray(q.options) }));
    setMcqs(shuffledMcqs);

    const essays = shuffleArray([
      ...shuffleArray(networks).slice(0, essayPerTopic),
      ...shuffleArray(os).slice(0, essayPerTopic),
      ...shuffleArray(security).slice(0, essayPerTopic),
    ]);
    setEssayQuestions(essays);
  }, []);

  const handleMcqAnswer = (answer) => {
    setMcqAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleMCQNext = () => {
    if (currentQuestion < mcqs.length - 1)
      setCurrentQuestion((prev) => prev + 1);
  };

  const handleMCQSubmit = () => {
    const score = Object.entries(mcqAnswers).filter(
      ([idx, answer]) => mcqs[parseInt(idx)].answer === answer
    ).length;
    setMcqScore(score);
    setSection("essay");
    setCurrentQuestion(0);
  };

  const handleEssayChange = (text) => {
    setEssayAnswers((prev) => ({ ...prev, [currentQuestion]: text }));
  };

  const handleEssayNext = async () => {
    const answer = essayAnswers[currentQuestion] || "";
    const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount < MIN_WORDS) return;

    setLoading(true);
    try {
      const res = await fetch(GRADING_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: essayQuestions[currentQuestion].question,
          answer,
        }),
      });
      const { result } = await res.json();
      setGraded((prev) => ({
        ...prev,
        [currentQuestion]: result || "No feedback.",
      }));

      if (currentQuestion === essayQuestions.length - 1) {
        setSubmitted(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    } catch (e) {
      console.error("Grading failed", e);
      setGraded((prev) => ({
        ...prev,
        [currentQuestion]: "❌ Error grading answer.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const renderMCQSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto bg-white/95 p-8 rounded-xl border border-indigo-200 shadow-xl backdrop-blur"
    >
      {mcqs[currentQuestion] && (
        <QuestionCard
          question={mcqs[currentQuestion]}
          index={currentQuestion}
          selectedOption={mcqAnswers[currentQuestion]}
          onOptionClick={handleMcqAnswer}
        />
      )}
      <div className="mt-8 flex justify-center gap-4 px-4">
        <motion.button
          onClick={
            currentQuestion === mcqs.length - 1
              ? handleMCQSubmit
              : handleMCQNext
          }
          disabled={!mcqAnswers[currentQuestion]}
          whileHover={mcqAnswers[currentQuestion] ? { scale: 1.02, y: -2 } : {}}
          whileTap={mcqAnswers[currentQuestion] ? { scale: 0.98 } : {}}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow transition-all min-w-[140px] ${
            mcqAnswers[currentQuestion]
              ? "bg-gradient-to-r from-indigo-400 to-indigo-500 text-white"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          {currentQuestion === mcqs.length - 1 ? "Start Essays" : "Next"}
        </motion.button>
      </div>
    </motion.div>
  );

  const renderEssaySection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto bg-white/95 p-8 rounded-xl border border-indigo-200 shadow-xl backdrop-blur"
    >
      {loading && (
        <div className="mb-6 p-4 bg-white/90 border border-indigo-200 rounded-lg backdrop-blur">
          <GradingProgress />
        </div>
      )}
      <EssayForm
        question={essayQuestions[currentQuestion]?.question}
        questionNumber={currentQuestion + 1}
        text={essayAnswers[currentQuestion] || ""}
        wordCount={
          (essayAnswers[currentQuestion] || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean).length
        }
        isLastQuestion={currentQuestion === essayQuestions.length - 1}
        loading={loading}
        onTextChange={handleEssayChange}
        onNext={handleEssayNext}
        onSubmit={handleEssayNext}
      />
    </motion.div>
  );

  const renderResults = () => (
    <ReviewSection
      title="Mock Exam Completed"
      mcqQuestions={mcqs}
      mcqAnswers={mcqAnswers}
      mcqScore={mcqScore}
      essayQuestions={essayQuestions}
      essayAnswers={essayAnswers}
      essayFeedback={graded}
      type="mock"
    />
  );

  return (
    <div className="min-h-screen px-8 py-12 bg-gradient-to-br from-indigo-50 to-indigo-100 font-inter text-slate-900">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 relative gap-4">
        <Header
          title="Mock Exam"
          onBack={() => navigate("/")}
          animated={true}
        />
        <div className="flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-10">
          <QuizNavigation
            questions={section === "mcq" ? mcqs : essayQuestions}
            currentQuestion={currentQuestion}
            userAnswers={section === "mcq" ? mcqAnswers : essayAnswers}
            onNavigate={(i) => {
              const questions = section === "mcq" ? mcqs : essayQuestions;
              if (i >= 0 && i < questions.length) setCurrentQuestion(i);
            }}
          />
        </div>
      </div>
      {submitted
        ? renderResults()
        : section === "mcq"
        ? renderMCQSection()
        : renderEssaySection()}
    </div>
  );
}
