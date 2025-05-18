import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SERVER_CONFIG } from "../config/server";
import type { JwtPayload } from "../types/models";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const payload = jwt.verify(token, SERVER_CONFIG.jwtSecret) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
