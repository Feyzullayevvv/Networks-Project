import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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
    <div className="w-full mb-8 px-4 sm:px-6 flex flex-col items-center gap-4 lg:gap-0 lg:justify-center relative">
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.02, x: -2 }}
        whileTap={{ scale: 0.98 }}
        className="px-5 py-3 rounded-xl bg-white/95 text-slate-900 text-sm font-medium flex items-center gap-2 border border-indigo-200 shadow backdrop-blur-sm transition-all lg:absolute lg:left-4 lg:top-1/2 lg:-translate-y-1/2"
      >
        <ArrowLeft size={16} />
        {backButtonText}
      </motion.button>

      <TitleComponent
        {...animationProps}
        className="text-center text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent leading-tight"
      >
        {title}
      </TitleComponent>
    </div>
  );
};

export default Header;
