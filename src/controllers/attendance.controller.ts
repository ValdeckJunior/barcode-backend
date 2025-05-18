import type { Request, Response } from "express";
import {
  markAttendance,
  getAttendanceByDate,
  getStudentAttendance,
  getAttendanceStats,
} from "../services/attendance.service.js";

export async function markAttendanceHandler(req: Request, res: Response) {
  try {
    const { courseId, date } = req.body;
    const userId = Number((req as any).user?.id);
    if (!userId || !courseId || !date) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const attendance = await markAttendance(userId, Number(courseId), date);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark attendance" });
  }
}

export async function getAttendanceByDateHandler(req: Request, res: Response) {
  try {
    const { courseId } = req.params;
    const { date } = req.query;
    if (!courseId || !date) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const attendance = await getAttendanceByDate(
      Number(courseId),
      date as string
    );
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Failed to get attendance" });
  }
}

export async function getStudentAttendanceHandler(req: Request, res: Response) {
  try {
    const { userId, courseId } = req.params;
    if (!userId || !courseId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const attendance = await getStudentAttendance(
      Number(userId),
      Number(courseId)
    );
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Failed to get student attendance" });
  }
}

export async function getAttendanceStatsHandler(req: Request, res: Response) {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const stats = await getAttendanceStats(Number(courseId));
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to get attendance stats" });
  }
}
