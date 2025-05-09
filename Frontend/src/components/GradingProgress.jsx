import React from "react";

const GradingProgress = ({ loading, progress }) => {
  const pct = progress * 100;

  if (!loading) return null;

  return (
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
  );
};

export default GradingProgress;
