import { config } from "dotenv";

config();

export const SERVER_CONFIG = {
  port: Number(process.env.PORT) || 8081,
  host: process.env.HOST || "192.168.43.63",
  jwtSecret: process.env.JWT_SECRET || "fallback-secret-key-change-this",
  corsOrigin: process.env.CORS_ORIGIN || "*",
} as const;
