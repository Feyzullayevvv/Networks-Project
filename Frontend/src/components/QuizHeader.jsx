import React from "react";
import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";

const QuizHeader = ({ title, onNavigateHome }) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 10,
        }}
      >
        <PrimaryButton onClick={onNavigateHome}>Main Page</PrimaryButton>
      </div>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#00ffcc",
          fontSize: "2.5rem",
        }}
      >
        {title}
      </motion.h2>
    </>
  );
};

export default QuizHeader;
