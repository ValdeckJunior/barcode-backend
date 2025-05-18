import type { Request, Response } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseByCode,
  updateCourse,
  deleteCourse,
} from "../services/course.service.js";
import type { CourseData } from "../types/models";

export async function createCourseHandler(req: Request, res: Response) {
  try {
    const courseData: CourseData = req.body;
    const course = await createCourse(courseData);
    res.status(201).json(course);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function getAllCoursesHandler(req: Request, res: Response) {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getCourseByCodeHandler(req: Request, res: Response) {
  try {
    const { code } = req.params;
    const course = await getCourseByCode(code);
    res.json(course);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function updateCourseHandler(req: Request, res: Response) {
  try {
    const { code } = req.params;
    const courseData: Partial<CourseData> = req.body;
    const course = await updateCourse(code, courseData);
    res.json(course);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function deleteCourseHandler(req: Request, res: Response) {
  try {
    const { code } = req.params;
    await deleteCourse(code);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
