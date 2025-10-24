const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes");
const summarizer = require("../controllers/summarize");

// CRUD
router.post("/", notesController.createNote);
router.get("/", notesController.getNotes);
router.get("/:id", notesController.getNote);
router.put("/:id", notesController.updateNote);
router.delete("/:id", notesController.deleteNote);

// Summarize
router.post("/:id/summarize", summarizer.summarizeNote);

module.exports = router;
