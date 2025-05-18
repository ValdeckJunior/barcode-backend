import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  createCourseHandler,
  getAllCoursesHandler,
  getCourseByCodeHandler,
  updateCourseHandler,
  deleteCourseHandler,
} from "../controllers/course.controller.js";

const router = Router();

// Protected routes
router.use(authenticateToken);

router.post("/", createCourseHandler);
router.get("/", getAllCoursesHandler);
router.get("/:code", getCourseByCodeHandler);
router.put("/:code", updateCourseHandler);
router.delete("/:code", deleteCourseHandler);

export default router;
