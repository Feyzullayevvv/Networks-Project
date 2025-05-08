// gemini-proxy.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post("/grade", async (req, res) => {
  const { question, answer } = req.body;

  const prompt = `You are a grading assistant for the CS2005 Networks and Operating Systems module. Grade the following answer strictly based on lecture slides. Return one of: PASS+, PASS, MARGINAL, or FAIL, and a short justification.\n\nQ: ${question}\nA: ${answer}`;

  try {
    const result = await model.generateContent([prompt]);
    const text = result.response.text();
    res.json({ result: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to fetch Gemini result." });
  }
});

app.listen(port, () => {
  console.log(`✅ Gemini grading server running on http://localhost:${port}`);
});
