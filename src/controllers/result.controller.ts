import type { Request, Response } from "express";
import { getResultsByMatricule } from "../services/result.service.js";

export async function getStudentResultsHandler(req: Request, res: Response) {
  try {
    const { matricule } = req.params;
    const results = await getResultsByMatricule(matricule);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
}
