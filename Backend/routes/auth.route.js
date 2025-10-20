import { signin,signup, updateProfile } from "../controllers/auth.controller.js";
import express from "express";
import { authenticate } from "../middleware/auth.js";

const AuthRouter = express.Router();

// --- ROUTES ---
AuthRouter.post("/signup", signup);
AuthRouter.post("/signin", signin);
AuthRouter.put("/me", authenticate, updateProfile);

export default AuthRouter;