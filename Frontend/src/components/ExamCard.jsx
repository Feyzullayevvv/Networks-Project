import { motion } from "framer-motion";

const gradientMap = {
  mcq: {
    background: "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
    shadow: "0 20px 40px rgba(99, 102, 241, 0.2)",
    lightBg: "rgba(129, 140, 248, 0.1)",
    border: "#818CF8",
    text: "#818CF8",
  },
  essay: {
    background: "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
    shadow: "0 20px 40px rgba(16, 185, 129, 0.2)",
    lightBg: "rgba(16, 185, 129, 0.1)",
    border: "#10B981",
    text: "#10B981",
  },
  both: {
    background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
    shadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
    lightBg: "rgba(59, 130, 246, 0.1)",
    border: "#3B82F6",
    text: "#3B82F6",
  },
};

const ExamCard = ({
  type,
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
  children,
}) => {
  const { background, shadow, lightBg, border, text } = gradientMap[type] || {};

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        boxShadow: shadow,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full p-8 rounded-3xl cursor-pointer transition-all duration-300"
      style={{
        background: "#ffffff",
        boxShadow: isSelected ? shadow : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        border: isSelected ? `2px solid ${border}` : "1px solid #E5E7EB",
        transform: isSelected ? "translateY(-5px)" : "none",
      }}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-2"
          style={{
            background: isSelected ? background : lightBg,
            color: isSelected ? "#ffffff" : text,
          }}
        >
          <Icon size={28} />
        </div>

        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        <p className="text-base text-slate-500 leading-relaxed">
          {description}
        </p>

        {children}
      </div>
    </motion.div>
  );
};

export default ExamCard;
