import type { Request, Response } from "express";
import { register, login } from "../services/auth.service.js";
import type { LoginCredentials, UserData } from "../types/models";

export async function registerHandler(req: Request, res: Response) {
  try {
    const userData: UserData = req.body;
    const result = await register(userData);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const credentials: LoginCredentials = req.body;
    const result = await login(credentials);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
