import React from "react";
import { Routes, Route } from "react-router-dom";
import MultipleChoice from "./routes/MultipleChoice"; // update path if needed
import MainPage from "./routes/MainPage";

import EssayQuestions from "./routes/EssayQuestions";
import MockExam from "./routes/MockExam"; // update path if needed

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mcq" element={<MultipleChoice />} />
      <Route path="/essay" element={<EssayQuestions />} />
      <Route path="/MockExam" element={<MockExam />} />
    </Routes>
  );
}
