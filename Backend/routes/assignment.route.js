// routes/assignment.js
import express from "express";
import { createAssignment, getAssignmentsByCohortGrouped } from "../controllers/assignment.controller.js";

const assignmentRouter = express.Router();


// POST /assignments
assignmentRouter.post("/", createAssignment);

// GET /assignments/by-cohort/:cohortNo
assignmentRouter.get("/by-cohort/:cohortNo", getAssignmentsByCohortGrouped);

export default assignmentRouter;
