import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getProfile,
  getQrCode,
  getRegisteredCourses,
} from "../controllers/student.controller.js";

const router = Router();

// Get student profile
router.get("/:matricule", authenticateToken, getProfile);

// Get student QR code
router.get("/:matricule/qrcode", authenticateToken, getQrCode);

// Get registered courses
router.get("/:matricule/courses", authenticateToken, getRegisteredCourses);

export default router;
