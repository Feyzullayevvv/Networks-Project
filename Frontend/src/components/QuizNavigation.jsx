import React from "react";

export default function QuizNavigation({
  questions,
  currentQuestion,
  userAnswers,
  onNavigate,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginBottom: "2rem",
      }}
    >
      {questions.map((_, index) => {
        const isCurrent = index === currentQuestion;
        const isAnswered = userAnswers[index] != null;
        // Default, answered, and current backgrounds:
        let background, color, border;
        if (isCurrent) {
          background = "linear-gradient(135deg, #00ffcc, #009999)";
          color = "#000";
          border = "2px solid #00ffcc";
        } else if (isAnswered) {
          background = "linear-gradient(135deg, #667eea, #764ba2)";
          color = "#fff";
          border = "2px solid #667eea";
        } else {
          background = "#2a2d42";
          color = "#e0e1f5";
          border = "2px solid rgba(255,255,255,0.1)";
        }

        return (
          <div
            key={index}
            onClick={() => onNavigate(index)}
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background,
              color,
              border,
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isCurrent) {
                e.currentTarget.style.boxShadow =
                  "0 0 12px rgba(0,255,204,0.4)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
}
