import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getStudentResultsHandler } from "../controllers/result.controller.js";

const router = Router();

// Get results for a student
router.get("/:matricule/results", authenticateToken, getStudentResultsHandler);

export default router;
