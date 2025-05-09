import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import colors from "../config/colors";

const styles = {
  container: {
    position: "relative",
    width: "100%",
    marginBottom: "2rem",
    padding: "1rem",
  },
  backButton: {
    position: "absolute",
    top: "50%",
    left: "1rem",
    transform: "translateY(-50%)",
    zIndex: 10,
    padding: "0.75rem 1.25rem",
    borderRadius: "0.75rem",
    background: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    color: colors.text.primary,
    fontSize: "0.9rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 10px rgba(99, 102, 241, 0.1)",
    backdropFilter: "blur(8px)",
  },
  title: {
    textAlign: "center",
    background: colors.primary.gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: 0,
    padding: "1rem 0",
  },
};

const Header = ({
  title,
  onBack,
  backButtonText = "Main Page",
  animated = true,
}) => {
  const TitleComponent = animated ? motion.h2 : "h2";
  const animationProps = animated
    ? {
        initial: { y: -20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <div style={styles.container}>
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.02, x: -2 }}
        whileTap={{ scale: 0.98 }}
        style={styles.backButton}
      >
        <ArrowLeft size={16} />
        {backButtonText}
      </motion.button>

      <TitleComponent {...animationProps} style={styles.title}>
        {title}
      </TitleComponent>
    </div>
  );
};

export default Header;
