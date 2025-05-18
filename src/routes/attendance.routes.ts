import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  markAttendanceHandler,
  getAttendanceByDateHandler,
  getStudentAttendanceHandler,
  getAttendanceStatsHandler,
} from "../controllers/attendance.controller.js";

const router = Router();

// Mark attendance for a student in a course
router.post("/mark", authenticateToken, markAttendanceHandler);

// Get attendance for a specific date in a course
router.get(
  "/course/:courseId/date",
  authenticateToken,
  getAttendanceByDateHandler
);

// Get all attendance records for a student in a course
router.get(
  "/student/:userId/course/:courseId",
  authenticateToken,
  getStudentAttendanceHandler
);

// Get attendance statistics for a course
router.get(
  "/course/:courseId/stats",
  authenticateToken,
  getAttendanceStatsHandler
);

export default router;
