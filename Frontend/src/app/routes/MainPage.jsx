import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, PenTool, Shuffle, Plus, Minus } from "lucide-react";

export default function MainPage() {
  const [examMode, setExamMode] = useState(null);
  const [essayCount, setEssayCount] = useState(3);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!examMode) return;
    if (examMode === "mcq") {
      navigate("/mcq", { state: { mode: "mcq" } });
    } else if (examMode === "essay") {
      navigate("/essay", { state: { mode: "essay", count: essayCount } });
    } else {
      navigate("/MockExam", {
        state: { mode: "both", mcqCount: 14, essayCount: 6 },
      });
    }
  };

  // shared card styles
  const cardBase = {
    flex: "1 1 240px",
    minWidth: 240,
    margin: 12,
    padding: 24,
    borderRadius: 16,
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    background: "#1e213a",
    color: "#d1d4f0",
    maxHeight: 300, // limit card height
    overflow: "hidden",
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100vw", // span full viewport
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0b0c1a", // solid dark base
        fontFamily: "'Segoe UI', sans-serif",
        color: "#e0e1f5",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}> N&O Survival Kit</h1>
      </motion.div>

      {/* Cards Grid */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "1rem",
          gap: "1rem",
          background: "#0b0c1a", // slightly lighter behind cards
        }}
      >
        {/* MCQ */}
        <motion.div
          onClick={() => setExamMode("mcq")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 16px rgba(102,126,234,0.6)",
          }}
          style={{
            ...cardBase,
            background:
              examMode === "mcq"
                ? "linear-gradient(135deg, #667eea, #764ba2)"
                : cardBase.background,
            color: examMode === "mcq" ? "#fff" : cardBase.color,
          }}
        >
          <Cpu size={36} />
          <h3 style={{ margin: "1rem 0 0.5rem" }}>🧠 Multiple Choice</h3>
          <small>14 randomly selected questions</small>
        </motion.div>

        {/* Essay */}
        <motion.div
          onClick={() => setExamMode("essay")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 16px rgba(247,140,160,0.6)",
          }}
          style={{
            ...cardBase,
            background:
              examMode === "essay"
                ? "linear-gradient(135deg, #f78ca0, #f9748f)"
                : cardBase.background,
            color: examMode === "essay" ? "#fff" : cardBase.color,
          }}
        >
          <PenTool size={36} />
          <h3 style={{ margin: "1rem 0 0.5rem" }}>✍️ Short Essay</h3>
          <small>Select number of questions</small>
          {examMode === "essay" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={() => setEssayCount((c) => Math.max(1, c - 1))}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Minus size={24} />
              </button>
              <span style={{ margin: "0 1rem", fontSize: "1.3rem" }}>
                {essayCount}
              </span>
              <button
                onClick={() => setEssayCount((c) => Math.min(6, c + 1))}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Plus size={24} />
              </button>
            </div>
          )}
        </motion.div>

        {/* Mock Exam */}
        <motion.div
          onClick={() => setExamMode("both")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 16px rgba(67,233,123,0.6)",
          }}
          style={{
            ...cardBase,
            background:
              examMode === "both"
                ? "linear-gradient(135deg, #43e97b, #38f9d7)"
                : cardBase.background,
            color: examMode === "both" ? "#fff" : cardBase.color,
          }}
        >
          <Shuffle size={36} />
          <h3 style={{ margin: "1rem 0 0.5rem" }}>🔄 Mock Exam</h3>
          <small>14 MCQs + 6 essays</small>
        </motion.div>
      </div>

      {/* Start Button Row */}
      <div
        style={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.button
          onClick={handleStart}
          disabled={!examMode}
          whileHover={
            examMode
              ? {
                  scale: 1.05,
                  boxShadow: "0 0 16px rgba(0,255,204,0.6)",
                }
              : {}
          }
          style={{
            padding: "1rem 3rem",
            background: examMode
              ? "linear-gradient(135deg, #00ffcc, #009999)"
              : "#555",
            color: examMode ? "#000" : "#888",
            fontSize: "1.25rem",
            border: "none",
            borderRadius: "999px",
            cursor: examMode ? "pointer" : "not-allowed",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        >
          🚀 Start Exam
        </motion.button>
      </div>
    </div>
  );
}
