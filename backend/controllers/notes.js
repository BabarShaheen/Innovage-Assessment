const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "title and content required" });

    const note = new Note({ title, content });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error("createNote error", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("getNotes error", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error("getNote error", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.title = title ?? note.title;
    note.content = content ?? note.content;
    // do not clear summary automatically; keep cached summary if available
    await note.save();
    res.json(note);
  } catch (err) {
    console.error("updateNote error", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("deleteNote error", err);
    res.status(500).json({ message: "Server error" });
  }
};
