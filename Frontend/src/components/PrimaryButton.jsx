import React from "react";
import { motion } from "framer-motion";

const PrimaryButton = ({ children, onClick, disabled = false, style = {} }) => {
  const baseStyle = {
    padding: "0.75rem 1.5rem",
    background: disabled ? "#555" : "linear-gradient(135deg, #43e97b, #38f9d7)",
    color: disabled ? "#888" : "#000",
    border: "none",
    borderRadius: "999px",
    fontSize: "1rem",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    ...style,
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      style={baseStyle}
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;
