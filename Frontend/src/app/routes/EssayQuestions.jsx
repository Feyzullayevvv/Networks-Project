import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import QuizNavigation from "../../components/QuizNavigation";
import GradingProgress from "../../components/GradingProgress";
import EssayForm from "../../components/EssayForm";
import GradingResults from "../../components/GradingResults";
import { shuffleArray } from "../../utils/quiz";
import { GRADING_API_URL, MIN_WORDS, ESSAY_COUNT } from "../../constants/quiz";

import networks from "../../questions/NetworksEssay.json";
import os from "../../questions/OperatingSystemsEssay.json";
import security from "../../questions/SecurityEssay.json";
const sourceMap = {
  networks,
  os,
  security,
};

export default function EssayQuestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const questionCount = location.state?.count || ESSAY_COUNT;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gradingProgress, setGradingProgress] = useState(0);
  const [graded, setGraded] = useState({});

  const getShownEssayIds = (topic) => {
    const stored = localStorage.getItem(`shownEssay_${topic}`);
    return stored ? JSON.parse(stored) : [];
  };

  const updateShownEssayIds = (topic, newQuestions) => {
    const shown = getShownEssayIds(topic);
    const updated = [...shown, ...newQuestions.map((q) => q.id)];

    if (updated.length >= (sourceMap[topic]?.length || 0)) {
      localStorage.setItem(`shownEssay_${topic}`, JSON.stringify([]));
      return [];
    }

    localStorage.setItem(`shownEssay_${topic}`, JSON.stringify(updated));
    return updated;
  };

  useEffect(() => {
    initializeQuestions();
  }, [questionCount]);

  const initializeQuestions = () => {
    const topic = location.state?.topic || "networks";
    const allQuestions = sourceMap[topic] || networks;
    const shownIds = getShownEssayIds(topic);
    const availableQuestions = allQuestions.filter(
      (q) => !shownIds.includes(q.id)
    );

    let selected;
    if (availableQuestions.length < questionCount) {
      localStorage.setItem(`shownEssay_${topic}`, JSON.stringify([]));
      selected = shuffleArray([...allQuestions]).slice(0, questionCount);
    } else {
      selected = shuffleArray(availableQuestions).slice(0, questionCount);
      updateShownEssayIds(topic, selected);
    }

    setQuestions(selected);
  };

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const handleInputChange = (text) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: text }));
  };

  const gradeAllAnswers = async () => {
    setLoading(true);
    const gradedResults = {};

    for (let i = 0; i < questions.length; i++) {
      const answer = userAnswers[i] || "";
      const wc = countWords(answer);

      if (wc < MIN_WORDS) {
        gradedResults[i] = {
          score: 0,
          feedback: `⚠️ Only ${wc} words (min ${MIN_WORDS})`,
          model_answer: "",
        };
        continue;
      }

      try {
        const res = await fetch(GRADING_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: questions[i].question,
            answer,
          }),
        });
        const data = await res.json();
        gradedResults[i] = data;
      } catch (error) {
        gradedResults[i] = {
          score: 0,
          feedback: "❌ Error grading this answer.",
          model_answer: "",
        };
      }
    }

    setGraded(gradedResults);
    setGradingProgress(questions.length);
    setLoading(false);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    await gradeAllAnswers();
  };

  const currentText = userAnswers[currentQuestion] || "";
  const wordCount = countWords(currentText);

  const renderContent = () => {
    if (submitted) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto bg-white bg-opacity-95 p-6 md:p-8 rounded-xl shadow-xl border border-indigo-200 backdrop-blur"
        >
          <GradingResults
            questions={questions}
            userAnswers={userAnswers}
            graded={graded}
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto bg-white bg-opacity-95 p-6 md:p-8 rounded-xl shadow-xl border border-indigo-200 backdrop-blur"
      >
        <div className="mb-8">
          <GradingProgress
            loading={loading}
            progress={gradingProgress / questions.length}
          />
        </div>
        <EssayForm
          question={questions[currentQuestion]?.question}
          questionNumber={currentQuestion + 1}
          text={currentText}
          wordCount={wordCount}
          isLastQuestion={currentQuestion === questions.length - 1}
          loading={loading}
          onTextChange={handleInputChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          showPrevious={currentQuestion > 0}
        />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-indigo-50 to-indigo-100 font-inter text-slate-900">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 relative gap-4">
        <Header
          title="✍️ Short Essay Questions"
          onBack={() => navigate("/")}
          animated={true}
        />
        <div className="flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-10">
          <QuizNavigation
            questions={questions}
            currentQuestion={currentQuestion}
            userAnswers={userAnswers}
            onNavigate={(i) =>
              i >= 0 && i < questions.length && setCurrentQuestion(i)
            }
          />
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
