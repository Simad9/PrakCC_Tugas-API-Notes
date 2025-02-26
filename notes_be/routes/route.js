import express from "express";

import {
  createNotes,
  getNotes,
  updateNotes,
  deleteNotes,
} from "../controller/NotesController.js";

const router = express.Router();

router.get("/notes", getNotes);
router.get("/notes/:id", getNotes);
router.post("/add-note", createNotes);
router.put("/update-note/:id", updateNotes);
router.delete("/delete-note/:id", deleteNotes);

router.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;
