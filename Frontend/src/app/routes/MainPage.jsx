import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, PenTool, Shuffle, Bot, Plus, Minus } from "lucide-react";
import ExamCard from "../../components/ExamCard";
import TopicSelector from "../../components/TopicSelector";

const colors = {
  background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
  primary: {
    main: "#6366f1",
    gradient: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
  },
  text: {
    primary: "#1e1b4b",
  },
};

const QuestionCount = ({ count, setCount, visible }) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center justify-center gap-3 mt-4 px-4 py-2 bg-[rgba(99,102,241,0.1)] rounded-xl"
    >
      <span className="text-[#6366f1] font-medium">Questions:</span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCount(Math.max(1, count - 1))}
        className="w-7 h-7 rounded-md bg-[linear-gradient(135deg,#818cf8_0%,#6366f1_100%)] text-white flex items-center justify-center shadow"
      >
        <Minus size={14} />
      </motion.button>
      <span className="text-[#6366f1] font-semibold text-base w-6 text-center">
        {count}
      </span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCount(Math.min(5, count + 1))}
        className="w-7 h-7 rounded-md bg-[linear-gradient(135deg,#818cf8_0%,#6366f1_100%)] text-white flex items-center justify-center shadow"
      >
        <Plus size={14} />
      </motion.button>
    </motion.div>
  );
};

const DiscordIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 71 55" fill="currentColor">
    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z" />
  </svg>
);

export default function MainPage() {
  const [examMode, setExamMode] = useState(null);
  const [essayCount, setEssayCount] = useState(3);
  const [selectedTopic, setSelectedTopic] = useState("networks");

  const navigate = useNavigate();

  const handleStart = () => {
    if (!examMode) return;
    const routes = {
      mcq: { path: "/mcq", state: { mode: "mcq" } },
      essay: {
        path: "/essay",
        state: { mode: "essay", count: essayCount, topic: selectedTopic },
      },
      both: { path: "/MockExam", state: { mode: "both" } },
    };
    const route = routes[examMode];
    navigate(route.path, { state: route.state });
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: colors.background,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: colors.text.primary,
        padding: "2rem 4rem",
      }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center relative mx-auto mt-16 mb-8 w-full max-w-[1000px] px-4 py-8 rounded-[2rem] shadow-[0_4px_20px_rgba(99,102,241,0.1)]"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="mb-2 flex justify-center lg:absolute lg:top-4 lg:right-4 lg:mb-0 gap-2 text-sm text-[#6366f1] px-4 py-2 rounded-full bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)]">
          <Bot size={16} />
          AI-Powered Grading
        </div>
        <motion.h1
          className="text-5xl font-extrabold mb-6 tracking-tight"
          style={{
            background: colors.primary.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
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
        className="grid gap-8 px-4 sm:px-8 py-8 w-full max-w-[1200px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 z-[1]"
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
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch justify-center gap-3 mt-4 w-full">
            <div className="flex-1 min-w-[180px] flex justify-center">
              <QuestionCount
                count={essayCount}
                setCount={setEssayCount}
                visible={examMode === "essay"}
              />
            </div>
            <div className="flex-1 min-w-[180px] flex justify-center">
              <TopicSelector
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                visible={examMode === "essay"}
              />
            </div>
          </div>
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
        className="lg:absolute lg:top-8 lg:left-8 mx-4 lg:mx-0 mt-24 lg:mt-0 max-w-[90%] sm:max-w-[320px] p-5 rounded-xl text-white text-sm z-50"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #2d2b55 100%)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(99, 102, 241, 0.3)",
        }}
      >
        <h4 className="mb-3 font-mono text-sm lg:text-base">
          If you would like to add questions, send keroch_ in this format:
        </h4>
        <div
          className="font-mono text-[10px] lg:text-xs p-2 lg:p-3 rounded-md whitespace-pre-wrap border"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            lineHeight: 1.4,
          }}
        >
          {`{
  "topic": "Networks",
  "question": "Your Question",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "answer": "Correct Option"
}`}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="fixed bottom-8 left-8 flex items-center gap-4 z-10"
      >
        <a
          href="discord://discord.com/users/keroch_"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 rounded-full text-base text-[#1e1b4b] border border-[rgba(99,102,241,0.2)] bg-white bg-opacity-95 backdrop-blur shadow hover:shadow-md transition-all"
        >
          <DiscordIcon />
          <span className="font-medium">keroch_</span>
        </a>
      </motion.div>

      <div className="mt-16 py-8 text-center">
        <motion.button
          onClick={handleStart}
          disabled={!examMode}
          whileHover={examMode ? { scale: 1.02, y: -2 } : {}}
          whileTap={examMode ? { scale: 0.98 } : {}}
          className={`px-16 py-5 text-lg font-semibold rounded-xl shadow transition-all ${
            examMode
              ? "bg-[linear-gradient(135deg,#818cf8_0%,#6366f1_100%)] text-white"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          Start {examMode ? examMode.toUpperCase() : "Exam"}
        </motion.button>
      </div>
    </div>
  );
}
