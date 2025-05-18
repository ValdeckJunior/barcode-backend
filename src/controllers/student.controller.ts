import type { Request, Response } from "express";
import {
  getStudentProfile,
  getStudentQrCode,
  getStudentRegisteredCourses,
} from "../services/student.service.js";

export async function getProfile(req: Request, res: Response) {
  try {
    const { matricule } = req.params;
    const profile = await getStudentProfile(matricule);
    res.json(profile);
  } catch (error) {
    res.status(404).json({ error: "Student not found" });
  }
}

export async function getQrCode(req: Request, res: Response) {
  try {
    const { matricule } = req.params;
    const qr = await getStudentQrCode(matricule);
    // Prevent caching and 304 responses
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });
    res.removeHeader && res.removeHeader("ETag");
    res.type("image/png").send(qr);
  } catch (error) {
    res.status(404).json({ error: "QR code not found" });
  }
}

export async function getRegisteredCourses(req: Request, res: Response) {
  try {
    const { matricule } = req.params;
    const courses = await getStudentRegisteredCourses(matricule);
    res.json(courses);
  } catch (error) {
    res.status(404).json({ error: "Courses not found" });
  }
}
