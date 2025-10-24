const axios = require("axios");
const Note = require("../models/Note");

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const AI_MODEL = process.env.AI_MODEL || "gpt-4o-mini";

if (!OPENAI_KEY) {
  console.warn(
    "OPENAI_API_KEY not set. Summarization endpoint will fail until you provide a key in .env"
  );
}

exports.summarizeNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Build a concise prompt; keep tokens low for cost
    const prompt = `You are an assistant that summarizes notes.\n\nProvide:
1) A one-line summary.
2) 3 bullet points of key ideas.\n\nNote:\n${note.content}\n\nReturn the summary as plain text.`;

    if (!OPENAI_KEY) {
      return res
        .status(500)
        .json({ message: "OpenAI API key not configured." });
    }

    const resp = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: AI_MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // defensive access
    const summary =
      resp?.data?.choices?.[0]?.message?.content?.trim() ??
      resp?.data?.choices?.[0]?.text?.trim() ??
      "";

    // cache summary on note
    note.summary = summary;
    await note.save();

    res.json({ summary });
  } catch (err) {
    console.error("summarizeNote error", err?.response?.data || err.message);
    res.status(500).json({ message: "Failed to summarize note" });
  }
};
