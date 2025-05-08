import React from "react";
import PrimaryButton from "./PrimaryButton";

export default function ReviewSection({
  questions,
  userAnswers,
  score,
  onRestart,
}) {
  return (
    <div
      style={{
        background: "#0b0c1a",
        padding: "1.5rem",
        borderRadius: "12px",
        color: "#e0e1f5",
        maxWidth: 800,
        margin: "auto",
      }}
    >
      <h3
        style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#00ffcc" }}
      >
        Your score: <span style={{ fontWeight: "bold" }}>{score}</span> /{" "}
        <span style={{ fontWeight: "bold" }}>{questions.length}</span>
      </h3>

      {questions.map((q, index) => {
        const selected = userAnswers[index];
        const isCorrect = selected === q.answer;
        return (
          <div
            key={index}
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              background: "#1e213a",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ marginBottom: "0.75rem", color: "#43e97b" }}>
              {index + 1}. {q.question}
            </h4>
            {q.options.map((option) => {
              const isUser = selected === option;
              const isRight = q.answer === option;
              // pick background for each case
              let bg = "#2a2d42";
              if (isUser && isRight) bg = "rgba(56,249,215,0.2)"; // your teal
              else if (isUser && !isRight)
                bg = "rgba(247,140,160,0.2)"; // your pink
              else if (!isUser && isRight) bg = "rgba(102,126,234,0.2)"; // your purple

              return (
                <div
                  key={option}
                  style={{
                    padding: "0.75rem",
                    marginBottom: "0.5rem",
                    background: bg,
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    color: "#e0e1f5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{option}</span>
                  {isUser && (
                    <span style={{ fontSize: "1.2rem" }}>
                      {isCorrect ? "✅" : "❌"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <PrimaryButton onClick={onRestart}>Start Again</PrimaryButton>
      </div>
    </div>
  );
}
