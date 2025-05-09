import React from "react";
import { motion } from "framer-motion";

const gradientMap = {
  mcq: {
    gradient: "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
    shadow: "rgba(99, 102, 241, 0.2)",
    lightBg: "rgba(129, 140, 248, 0.1)",
    border: "#818CF8",
  },
  essay: {
    gradient: "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
    shadow: "rgba(16, 185, 129, 0.2)",
    lightBg: "rgba(16, 185, 129, 0.1)",
    border: "#10B981",
  },
  both: {
    gradient: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
    shadow: "rgba(59, 130, 246, 0.2)",
    lightBg: "rgba(59, 130, 246, 0.1)",
    border: "#3B82F6",
  },
};

const styles = {
  card: {
    flex: "1 1 300px",
    minWidth: 300,
    padding: "2rem",
    borderRadius: "1.5rem",
    cursor: "pointer",
    textAlign: "center",
    background: "#ffffff",
    border: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  iconWrapper: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.5rem",
    transition: "all 0.3s ease",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1E293B",
    margin: "0.5rem 0",
  },
  description: {
    fontSize: "1rem",
    color: "#64748B",
    lineHeight: "1.6",
    margin: 0,
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
  const { gradient, shadow, lightBg, border } = gradientMap[type] || {};

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        boxShadow: `0 20px 40px ${shadow}`,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      style={{
        ...styles.card,
        boxShadow: isSelected
          ? `0 20px 40px ${shadow}`
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        border: isSelected ? `2px solid ${border}` : styles.card.border,
        transform: isSelected ? "translateY(-5px)" : "none",
      }}
    >
      <motion.div
        style={{
          ...styles.iconWrapper,
          background: isSelected ? gradient : lightBg,
          color: isSelected ? "#ffffff" : border,
        }}
      >
        <Icon size={28} />
      </motion.div>

      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      {children}
    </motion.div>
  );
};

export default ExamCard;
