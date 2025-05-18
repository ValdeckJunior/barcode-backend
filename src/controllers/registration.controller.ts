import type { Request, Response } from "express";
import {
  registerStudentForCourse,
  unregisterStudentFromCourse,
} from "../services/registration.service.js";

export async function registerCourseHandler(req: Request, res: Response) {
  try {
    const { id } = req.params; // courseId
    const { matricule } = req.body;
    const registration = await registerStudentForCourse(matricule, id);
    res.json(registration);
  } catch (error) {
    res.status(400).json({ error: "Failed to register for course" });
  }
}

export async function unregisterCourseHandler(req: Request, res: Response) {
  try {
    const { id } = req.params; // courseId
    const { matricule } = req.body;
    const result = await unregisterStudentFromCourse(matricule, id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Failed to unregister from course" });
  }
}
