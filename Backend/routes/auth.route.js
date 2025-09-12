import { signin,signup } from "../controllers/Auth.controller.js";
import express from "express";

const AuthRouter = express.Router();

// --- ROUTES ---
AuthRouter.post("/signup", signup);
AuthRouter.post("/signin", signin);

export default AuthRouter;