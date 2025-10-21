// routes/assignment.js
import express from "express";
import { createAssignment, getAssignmentsByCohortGrouped } from "../controllers/assignment.controller.js";
import { requireAdmin } from "../middleware/auth.js";

const assignmentRouter = express.Router();

// POST /assignments (Admin only)
assignmentRouter.post("/", requireAdmin, createAssignment);

// GET /assignments/by-cohort/:cohortNo
assignmentRouter.get("/by-cohort/:cohortNo", getAssignmentsByCohortGrouped);

export default assignmentRouter;
