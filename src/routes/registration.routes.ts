import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  registerCourseHandler,
  unregisterCourseHandler,
} from "../controllers/registration.controller.js";

const router = Router();

// Register student for a course
router.post("/:id/register", authenticateToken, registerCourseHandler);
// Unregister student from a course
router.post("/:id/unregister", authenticateToken, unregisterCourseHandler);

export default router;
