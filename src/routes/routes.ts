import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

// Subdomain routes
router.use("/user", userRoutes); // Handles user-related endpoints

export default router;