import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizNavigation from "./../../components/QuizNavigation";
import PrimaryButton from "./../../components/PrimaryButton";
import QuestionCard from "./../../components/QuestionCard";

import mcq from "../../questions/MCQ.json";
import networks from "../../questions/NetworksEssay.json";
import os from "../../questions/OperatingSystemsEssay.json";
import security from "../../questions/SecurityEssay.json";

function shuffle(array) {
  return [...array].sort(() => 0.5 - Math.random());
}

export default function MockExam() {
  const location = useLocation();
  const navigate = useNavigate();
  const mcqCount = 14;
  const essayPerTopic = 1;

  const [mcqs, setMcqs] = useState([]);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [essayQuestions, setEssayQuestions] = useState([]);
  const [essayAnswers, setEssayAnswers] = useState({});
  const [graded, setGraded] = useState({});

  const [section, setSection] = useState("mcq");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMcqs(
      shuffle(mcq)
        .slice(0, mcqCount)
        .map((q) => ({ ...q, options: shuffle(q.options) }))
    );
    const selectedEssays = [
      ...shuffle(networks).slice(0, essayPerTopic),
      ...shuffle(os).slice(0, essayPerTopic),
      ...shuffle(security).slice(0, essayPerTopic),
    ];
    setEssayQuestions(shuffle(selectedEssays));
  }, []);

  const handleMcqAnswer = (option) => {
    setMcqAnswers({ ...mcqAnswers, [currentQuestion]: option });
  };

  const getWordCount = (text) => text.trim().split(/\s+/).length;

  const gradeEssay = async (index) => {
    const questionText = essayQuestions[index]?.question;
    const answerText = essayAnswers[index] || "";
    const wordCount = getWordCount(answerText);

    if (wordCount < 100) {
      setGraded((p) => ({
        ...p,
        [index]: `Word count: ${wordCount} (Too short)`,
      }));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText, answer: answerText }),
      });
      const data = await res.json();
      setGraded((p) => ({ ...p, [index]: data.result || "No feedback." }));
    } catch {
      setGraded((p) => ({ ...p, [index]: "❌ Error grading." }));
    } finally {
      setLoading(false);
    }
  };

  const handleEssayChange = (text) =>
    setEssayAnswers({ ...essayAnswers, [currentQuestion]: text });

  const handleEssayNext = async () => {
    await gradeEssay(currentQuestion);
    if (currentQuestion < essayQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleMCQNext = () => {
    if (currentQuestion < mcqs.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const handleMCQSubmit = () => {
    setSection("essay");
    setCurrentQuestion(0);
  };

  const mcqScore = Object.entries(mcqAnswers).filter(
    ([i, a]) => mcqs[+i]?.answer === a
  ).length;

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
          fontSize: "2rem",
          marginBottom: "1.5rem",
        }}
      >
        Mock Exam
      </h2>

      {section === "mcq" ? (
        <div
          style={{
            maxWidth: 800,
            margin: "auto",
            background: "#1e213a",
            borderRadius: 12,
            padding: "1.5rem",
          }}
        >
          <QuizNavigation
            questions={mcqs}
            currentQuestion={currentQuestion}
            userAnswers={mcqAnswers}
            onNavigate={(i) =>
              i >= 0 && i < mcqs.length && setCurrentQuestion(i)
            }
          />
          {mcqs[currentQuestion] && (
            <QuestionCard
              question={mcqs[currentQuestion]}
              index={currentQuestion}
              selectedOption={mcqAnswers[currentQuestion]}
              onOptionClick={handleMcqAnswer}
            />
          )}
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            {currentQuestion === mcqs.length - 1 ? (
              <PrimaryButton onClick={handleMCQSubmit}>
                Start Essays
              </PrimaryButton>
            ) : (
              <PrimaryButton
                onClick={handleMCQNext}
                disabled={!mcqAnswers[currentQuestion]}
              >
                Next
              </PrimaryButton>
            )}
          </div>
        </div>
      ) : !submitted ? (
        <div
          style={{
            maxWidth: 800,
            margin: "auto",
            background: "#1e213a",
            borderRadius: 12,
            padding: "1.5rem",
          }}
        >
          <QuizNavigation
            questions={essayQuestions}
            currentQuestion={currentQuestion}
            userAnswers={essayAnswers}
            onNavigate={setCurrentQuestion}
          />
          <h3 style={{ color: "#43e97b" }}>✍️ Essay Q{currentQuestion + 1}:</h3>
          <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
            {essayQuestions[currentQuestion]?.question}
          </p>
          <textarea
            value={essayAnswers[currentQuestion] || ""}
            onChange={(e) => handleEssayChange(e.target.value)}
            rows={10}
            placeholder="Write your answer here (min 100 words)…"
            style={{
              width: "100%",
              background: "#2a2d42",
              border: "1px solid #555",
              color: "#e0e1f5",
              padding: "0.75rem",
              borderRadius: 6,
              resize: "vertical",
              fontSize: "1rem",
            }}
          />
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <PrimaryButton
              onClick={handleEssayNext}
              disabled={!essayAnswers[currentQuestion] || loading}
            >
              {currentQuestion === essayQuestions.length - 1
                ? "Submit"
                : "Next"}
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div
          style={{
            maxWidth: 800,
            margin: "auto",
            background: "#1e213a",
            borderRadius: 12,
            padding: "1.5rem",
          }}
        >
          <h3 style={{ color: "#43e97b", textAlign: "center" }}>
            ✅ Mock Exam Completed
          </h3>

          {/** MCQ Review Section **/}
          <div style={{ margin: "2rem 0" }}>
            <h4 style={{ color: "#00ffcc", marginBottom: "0.75rem" }}>
              📝 MCQ Review (Score: {mcqScore}/{mcqs.length})
            </h4>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {mcqs.map((q, i) => {
                const userAns = mcqAnswers[i];
                const correct = q.answer === userAns;
                return (
                  <li
                    key={i}
                    style={{
                      marginBottom: "1rem",
                      background: "#2a2d42",
                      padding: "0.75rem",
                      borderRadius: 6,
                    }}
                  >
                    <p style={{ margin: 0, color: "#e0e1f5" }}>
                      <strong>Q{i + 1}:</strong> {q.question}
                    </p>
                    <p style={{ margin: "0.25rem 0", color: "#ced4da" }}>
                      Your answer:{" "}
                      <span style={{ color: correct ? "#43e97b" : "#f66" }}>
                        {userAns || "—"}
                      </span>
                    </p>
                    {!correct && (
                      <p style={{ margin: 0, color: "#00ffcc" }}>
                        Correct: {q.answer}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/** Essay Review Section **/}
          <h4 style={{ color: "#00ffcc", marginBottom: "0.75rem" }}>
            📊 Essay Results
          </h4>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {essayQuestions.map((q, i) => (
              <li
                key={i}
                style={{
                  marginBottom: "1.25rem",
                  padding: "1rem",
                  background: "#2a2d42",
                  borderRadius: 6,
                }}
              >
                <p style={{ marginBottom: "0.5rem", color: "#e0e1f5" }}>
                  <strong>Q{i + 1}:</strong> {q.question}
                </p>
                <p style={{ fontStyle: "italic", color: "#ced4da" }}>
                  ✍️ Your Answer: {essayAnswers[i] || "No answer provided."}
                </p>
                <p style={{ marginTop: "0.5rem", color: "#00ffcc" }}>
                  🧠 Result: {graded[i] || "Not graded."}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
