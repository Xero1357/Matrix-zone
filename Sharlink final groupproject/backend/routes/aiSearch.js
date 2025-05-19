const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    const prompt = `
Give me a list of 5 web links that are similar in topic or content to this one:
${url}
Only return the links, one per line.
`;

    const openaiRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
      }
    );

    const reply = openaiRes.data.choices[0].message.content;
    const links = reply
      .split("\n")
      .map((line) => line.trim().match(/https?:\/\/[^\s]+/))
      .filter(Boolean)
      .map((match) => match[0]);

    res.json({ similarLinks: links });
  } catch (err) {
    console.error("OpenRouter request failed:", err.message);
    res.status(500).json({ error: "AI service error" });
  }
});

module.exports = router;
