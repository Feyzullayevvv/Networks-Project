import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizNavigation from "./../../components/QuizNavigation";
import PrimaryButton from "./../../components/PrimaryButton";

import networks from "../../questions/NetworksEssay.json";
import os from "../../questions/OperatingSystemsEssay.json";
import security from "../../questions/SecurityEssay.json";

export default function EssayQuestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const questionCount = location.state?.count || 3;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gradingProgress, setGradingProgress] = useState(0);
  const [graded, setGraded] = useState({});

  useEffect(() => {
    const sets = [networks, os, security];
    const perSet = Math.ceil(questionCount / sets.length);
    const pool = sets.flatMap((set) =>
      set.sort(() => 0.5 - Math.random()).slice(0, perSet)
    );
    setQuestions(pool.sort(() => 0.5 - Math.random()).slice(0, questionCount));
  }, [questionCount]);

  const handleInputChange = (text) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: text });
  };

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const gradeOne = async (idx) => {
    const answer = userAnswers[idx] || "";
    const wc = countWords(answer);

    if (wc < 100) {
      setGraded((g) => ({
        ...g,
        [idx]: `⚠️ Only ${wc} words (min 100)`,
      }));
      setGradingProgress((p) => p + 1);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questions[idx].question,
          answer,
        }),
      });
      const { result } = await res.json();
      setGraded((g) => ({ ...g, [idx]: result || "No feedback." }));
    } catch {
      setGraded((g) => ({
        ...g,
        [idx]: "❌ Error grading this answer.",
      }));
    }
    setGradingProgress((p) => p + 1);
    setLoading(false);
  };

  const handleNext = async () => {
    await gradeOne(currentQuestion);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((i) => i + 1);
    }
  };

  const handleSubmit = async () => {
    await gradeOne(currentQuestion);
    setSubmitted(true);
  };

  const currentText = userAnswers[currentQuestion] || "";
  const wordCount = countWords(currentText);
  const pct = (gradingProgress / questions.length) * 100;

  return (
    <div
      style={{
        position: "relative",
        background: "#0b0c1a",
        color: "#e0e1f5",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      {/** Main Page button top-left **/}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 10,
        }}
      >
        <PrimaryButton onClick={() => navigate("/")}>Main Page</PrimaryButton>
      </div>

      <h2
        style={{
          textAlign: "center",
          color: "#00ffcc",
          marginBottom: "2rem",
        }}
      >
        ✍️ Short Essay Questions
      </h2>

      <QuizNavigation
        questions={questions}
        currentQuestion={currentQuestion}
        userAnswers={userAnswers}
        onNavigate={(i) =>
          i >= 0 && i < questions.length && setCurrentQuestion(i)
        }
      />

      {loading && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <p>🧠 Grading your answer…</p>
          <div
            style={{
              width: "100%",
              background: "#22263a",
              borderRadius: 6,
              overflow: "hidden",
              height: 12,
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                background: "#43e97b",
                height: "100%",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      )}

      {!submitted ? (
        <div
          style={{
            maxWidth: 800,
            margin: "auto",
            background: "#1e213a",
            padding: "1.5rem",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#e0e1f5", width: "100%" }}>
            {currentQuestion + 1}. {questions[currentQuestion]?.question}
          </h3>

          <textarea
            value={currentText}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Write your answer here (minimum 100 words)…"
            style={{
              width: "90%",
              height: 180,
              marginTop: "1rem",
              background: "#2a2d42",
              border: "1px solid #555",
              color: "#e0e1f5",
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: 6,
              resize: "vertical",
              overflowY: "auto",
            }}
          />

          <div
            style={{
              width: "90%",
              textAlign: "right",
              marginTop: "0.5rem",
              color: wordCount < 100 ? "#f66" : "#43e97b",
            }}
          >
            Word count: {wordCount}
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            {currentQuestion === questions.length - 1 ? (
              <PrimaryButton
                onClick={handleSubmit}
                disabled={wordCount < 100 || loading}
              >
                Submit
              </PrimaryButton>
            ) : (
              <PrimaryButton
                onClick={handleNext}
                disabled={wordCount < 100 || loading}
              >
                Next
              </PrimaryButton>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            maxWidth: 800,
            margin: "auto",
            background: "#1e213a",
            padding: "1.5rem",
            borderRadius: 12,
          }}
        >
          <h3 style={{ color: "#43e97b", textAlign: "center" }}>
            ✅ Your answers have been submitted!
          </h3>
          <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
            <h4 style={{ color: "#00ffcc" }}>📊 Grading Results:</h4>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {questions.map((q, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: "1.25rem",
                    background: "#2a2d42",
                    padding: "1rem",
                    borderRadius: 6,
                  }}
                >
                  <p style={{ marginBottom: 4 }}>
                    <strong style={{ color: "#e0e1f5" }}>Q{i + 1}:</strong>{" "}
                    <span style={{ color: "#ced4da" }}>{q.question}</span>
                  </p>
                  <p style={{ fontStyle: "italic", color: "#b0b3c6" }}>
                    ✍️ Your Answer:{" "}
                    <span style={{ color: "#e0e1f5" }}>
                      {userAnswers[i] || "No answer provided."}
                    </span>
                  </p>
                  <p style={{ marginTop: 4, color: "#00ffcc" }}>
                    🧠 Feedback:{" "}
                    <span style={{ color: "#43e97b" }}>
                      {graded[i] || "No feedback."}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
