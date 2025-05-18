import {
  getStudentProfileByMatricule,
  getStudentRegisteredCourses,
} from "../services/student.service.js";
import { z } from "zod";
import type { Request, Response } from "express";

export async function verifyQrCode(req: Request, res: Response) {
  // Validate input
  const schema = z.object({
    qrcode: z.string(),
  });
  const parse = schema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const { qrcode } = parse.data;

  // Decode QR payload (assume JSON string for now)
  let payload;
  try {
    payload = JSON.parse(Buffer.from(qrcode, "base64").toString("utf-8"));
  } catch (e) {
    return res.status(400).json({ error: "Invalid QR code payload" });
  }
  const { matricule } = payload;
  if (!matricule) {
    return res.status(400).json({ error: "Malformed QR code data" });
  }
  // Fetch student info
  const student = await getStudentProfileByMatricule(matricule);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  // Fetch all registered courses for the student
  const courses = await getStudentRegisteredCourses(matricule);
  res.json({ student, courses });
}
