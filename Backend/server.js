const express = require("express");
const cors = require("cors");

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());
7;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-001",
});

app.post("/grade", async (req, res) => {
  const { question, answer } = req.body;

  const prompt = `You are a grading assistant for the CS2005 Networks and Operating Systems module. Based strictly on the official lecture slides and exam briefing, do the following:

1. Evaluate the student's answer to the following question.
2. Assign a percentage score (0 to 100).
3. Give a concise explanation (max 30 words) of why the answer received this score.
4. Generate a model answer limited to 200 words that focuses on areas the student missed or explained poorly.

Keep the total output under 250 words. Do NOT restate the question. Use clear, accurate terminology only.

QUESTION:
${question}

STUDENT ANSWER:
${answer}

Return your response in this JSON format:
{
  "score": [number],
  "feedback": "[max 30-word explanation]",
  "model_answer": "[a clear and accurate 200-word max model answer]"
}`;

  try {
    const result = await model.generateContent([prompt]);
    const raw = result.response.text();
    console.log("🧠 Raw Gemini Output:\n", raw);

    // Remove Markdown code fences like ```json or ```
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Find JSON start
    const jsonStart = cleaned.indexOf("{");
    if (jsonStart === -1) {
      throw new Error("No JSON object found in Gemini response");
    }

    const jsonText = cleaned.slice(jsonStart);

    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (err) {
    console.error("❌ Error parsing Gemini response:", err.message);
    res.status(500).json({
      error: "Gemini API response was not valid JSON.",
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Gemini backend is running on port ${PORT}`);
});
