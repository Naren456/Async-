import express from "express";

import { getCourseraAssignments } from "../controllers/coursera.controller.js";

const CourseraRouter = express.Router();

// --- ROUTES --- //
CourseraRouter.get("/assignments", getCourseraAssignments);

export default CourseraRouter;
