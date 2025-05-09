import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, PenTool, Shuffle, Bot, Plus, Minus } from "lucide-react";
import ExamCard from "../../components/ExamCard";
const colors = {
  background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
  card: {
    bg: "#ffffff",
    hover: "rgba(255, 255, 255, 0.8)",
    selected: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
    shadow: "0 8px 32px rgba(99, 102, 241, 0.2)",
    border: "#6366f1",
  },
  primary: {
    main: "#6366f1",
    light: "#818cf8",
    dark: "#4f46e5",
    gradient: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
  },
  text: {
    primary: "#1e1b4b",
    secondary: "#4338ca",
    light: "#6366f1",
  },
};

const styles = {
  container: {
    margin: 0,
    padding: "2rem 4rem", // Increased horizontal padding
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: colors.background,
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: colors.text.primary,
    position: "relative",
    overflow: "hidden",
  },
  header: {
    padding: "2rem 1rem 3rem",
    textAlign: "center",
    position: "relative",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "2rem",
    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.1)",
    margin: "4rem auto 2rem", // Increased top margin
    maxWidth: "1000px",
    width: "100%",
  },
  aiIndicator: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: colors.primary.main,
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    background: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
  },
  title: {
    fontSize: "4rem",
    margin: 0,
    background: colors.primary.gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "800",
    marginBottom: "1.5rem",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "1.25rem",
    color: colors.text.secondary,
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
    fontWeight: "500",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  questionSubmit: {
    position: "absolute",
    padding: "1.25rem",
    maxWidth: "280px", // Reduced width
    top: "1.5rem",
    left: "1.5rem",
    background: "linear-gradient(135deg, #1e1b4b 0%, #2d2b55 100%)", // Darker background
    borderRadius: "0.75rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    color: "#fff",

    zIndex: 20,
  },
  codeBlock: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    fontSize: "0.75rem",
    fontFamily: "'JetBrains Mono', monospace", // Code font
    whiteSpace: "pre-wrap",
    margin: "0.5rem 0 0",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    color: "#fff",
    backdropFilter: "blur(4px)",
    lineHeight: "1.4",
  },
  socialLinks: {
    position: "fixed",
    bottom: "2rem",
    left: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    zIndex: 10,
  },
  socialButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "1rem",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    color: colors.text.primary,
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none",
    boxShadow: "0 2px 10px rgba(99, 102, 241, 0.1)",
  },
  startButtonContainer: {
    marginTop: "4rem",
    padding: "2rem 0",
    textAlign: "center",
  },
  startButton: {
    padding: "1.25rem 4rem",
    fontSize: "1.25rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: colors.primary.gradient,
    color: "#ffffff",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
  },
  questionCountContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    background: "rgba(99, 102, 241, 0.1)",
    borderRadius: "0.75rem",
  },
  countButton: {
    padding: "0.5rem",
    width: "28px",
    height: "28px",
    borderRadius: "0.5rem",
    background: colors.primary.gradient,
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)",
    transition: "all 0.2s ease",
  },
  countDisplay: {
    fontSize: "1rem",
    fontWeight: "600",
    color: colors.primary.main,
    minWidth: "1.5rem",
    textAlign: "center",
  },
};

const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 71 55" fill="currentColor">
    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z" />
  </svg>
);
const QuestionCount = ({ count, setCount, visible }) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      style={styles.questionCountContainer}
    >
      <span style={styles.countLabel}>Questions:</span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCount(Math.max(1, count - 1))}
        style={styles.countButton}
      >
        <Minus size={14} />
      </motion.button>
      <span style={styles.countDisplay}>{count}</span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCount(Math.min(5, count + 1))}
        style={styles.countButton}
      >
        <Plus size={14} />
      </motion.button>
    </motion.div>
  );
};
export default function MainPage() {
  const [examMode, setExamMode] = useState(null);
  const [essayCount, setEssayCount] = useState(3);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!examMode) return;
    const routes = {
      mcq: { path: "/mcq", state: { mode: "mcq" } },
      essay: { path: "/essay", state: { mode: "essay", count: essayCount } },
      both: { path: "/MockExam", state: { mode: "both" } },
    };
    const route = routes[examMode];
    navigate(route.path, { state: route.state });
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={styles.header}
      >
        <div style={styles.aiIndicator}>
          <Bot size={16} />
          AI-Powered Grading
        </div>
        <motion.h1
          style={styles.title}
          animate={{
            textShadow: [
              "0 0 20px rgba(99, 102, 241, 0.3)",
              "0 0 40px rgba(99, 102, 241, 0.2)",
              "0 0 20px rgba(99, 102, 241, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Networks & OS
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={styles.cardsGrid}
      >
        <ExamCard
          type="mcq"
          icon={Cpu}
          title="Multiple Choice Questions"
          description="14 randomly selected questions to test your knowledge"
          isSelected={examMode === "mcq"}
          onClick={() => setExamMode("mcq")}
        />
        <ExamCard
          type="essay"
          icon={PenTool}
          title="Essay Questions"
          description={`${essayCount} AI-graded essay questions with detailed feedback`}
          isSelected={examMode === "essay"}
          onClick={() => setExamMode("essay")}
        >
          <QuestionCount
            count={essayCount}
            setCount={setEssayCount}
            visible={examMode === "essay"}
          />
        </ExamCard>
        <ExamCard
          type="both"
          icon={Shuffle}
          title="Complete Mock Exam"
          description="Full exam experience with MCQs and AI-graded essays"
          isSelected={examMode === "both"}
          onClick={() => setExamMode("both")}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={styles.questionSubmit}
      >
        <h4
          style={{
            margin: "0 0 0.75rem",
            color: "#fff",
            fontSize: "0.9rem",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          If you would like to add questions, send keroch_ in this format:
        </h4>
        <div style={styles.codeBlock}>
          {`{
  "topic": "Networks",
  "question": "Your Question",
  "options": [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  "answer": "Correct Option"
}`}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={styles.socialLinks}
      >
        <a
          href="discord://discord.com/users/keroch_"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.socialButton}
        >
          <DiscordIcon />
          keroch_
        </a>
      </motion.div>

      <div style={styles.startButtonContainer}>
        <motion.button
          onClick={handleStart}
          disabled={!examMode}
          whileHover={examMode ? { scale: 1.02, y: -2 } : {}}
          whileTap={examMode ? { scale: 0.98 } : {}}
          style={{
            ...styles.startButton,
            opacity: examMode ? 1 : 0.5,
            cursor: examMode ? "pointer" : "not-allowed",
          }}
        >
          Start {examMode ? examMode.toUpperCase() : "Exam"}
        </motion.button>
      </div>
    </div>
  );
}
