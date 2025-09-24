import express from "express";
import {
  getAllSubjects,
  getUserSubjects,
  createSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller.js";

const subjectRouter = express.Router();

// ---------------- Public Routes ----------------
// Get all subjects
subjectRouter.get("/", getAllSubjects);

// Get subjects for a specific user (based on semester & term)
subjectRouter.get("/user/:userId", getUserSubjects);

// Get single subject by ID
subjectRouter.get("/:subjectId", getSubjectById);

// ---------------- Admin Routes ----------------
// Create a new subject
subjectRouter.post("/", createSubject);

// Update a subject
subjectRouter.put("/:subjectId", updateSubject);

// Delete a subject
subjectRouter.delete("/:subjectId", deleteSubject);

export default subjectRouter;
