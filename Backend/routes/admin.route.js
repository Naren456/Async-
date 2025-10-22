import express from "express";
import { requireAdmin } from "../middleware/auth.js";
import { getAdminStats } from "../controllers/admin.controller.js";
import { getAllUsers } from "../controllers/admin.controller.js";
const adminRouter = express.Router();

// All admin routes require admin authentication
adminRouter.use(requireAdmin);

// GET /admin/stats
adminRouter.get("/stats", getAdminStats);
adminRouter.get("/Users",getAllUsers)

export default adminRouter;
