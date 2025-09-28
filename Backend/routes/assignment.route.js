// routes/assignment.js
import express from "express";
import { createAssignment } from "../controllers/assignment.controller.js";

const assignmentRouter = express.Router();


// POST /assignments
assignmentRouter.post("/", createAssignment);

export default assignmentRouter;
