import express from "express";
import {
  createNotes,
  getNotes,
  updateNotes,
  deleteNotes,
} from "../controller/NotesController.js";
import {
  Register,
  Login,
  refreshToken,
  logout,
} from "../controller/UsersController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// Notes Routes
router.get("/notes", getNotes);
router.get("/notes/:id", getNotes);
router.post("/add-note", createNotes);
router.put("/update-note/:id", updateNotes);
router.delete("/delete-note/:id", deleteNotes);

// User Routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

router.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;
