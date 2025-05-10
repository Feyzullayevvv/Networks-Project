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
  model: "gemini-2.5-pro-preview-05-06",
});

app.post("/grade", async (req, res) => {
  const { question, answer } = req.body;

  const prompt = `You are a grading assistant for the CS2005 Networks and Operating Systems module. Based strictly on the official lecture slides and the exam briefing document, perform the following tasks:

1. Provide a model answer to the question below, aiming for approximately 300 words.
2. Assign a grade from 0 to 100 to this model answer.
3. Offer a concise explanation (maximum 30 words) discussing:
   - The accuracy and completeness of the answer.
   - Use of correct terminology and concepts.
   - Structure and clarity of the response.
   - Areas for improvement.

Be objective and avoid making up facts. Be strict if the answer lacks specificity, structure, or correct terminology.

QUESTION:
${question}`;

  try {
    const result = await model.generateContent([prompt]);
    const text = result.response.text();

    res.json({ result: text });
  } catch (err) {
    console.error("Gemini grading error:", err);
    res.status(500).json({ error: "Gemini API request failed." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Gemini backend is running on port ${PORT}`);
});
