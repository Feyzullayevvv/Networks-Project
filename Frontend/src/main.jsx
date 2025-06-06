import React from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.jsx";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Analytics />
    <App />
  </BrowserRouter>
);
