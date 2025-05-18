import express from "express";
import cors from "cors";
import morgan from "morgan";
import { SERVER_CONFIG } from "./config/server.js";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.ts";
import attendanceRoutes from "./routes/attendance.routes.js";
import resultRoutes from "./routes/result.routes.js";
import studentRoutes from "./routes/student.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
import { router as verifyQrCodeRoutes } from "./routes/verify-qrcode.routes.js";

const app = express();

// Middleware
app.use(morgan(":date[iso] :method :url :status :response-time ms"));
app.use(
  cors({
    origin: SERVER_CONFIG.corsOrigin,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/api/verify-qrcode", verifyQrCodeRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handling middleware
app.use(
  (
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error((err as Error).stack);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? (err as Error).message
          : undefined,
    });
  }
);

app.listen(SERVER_CONFIG.port, SERVER_CONFIG.host, () => {
  console.log(`Server running on ${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`);
});

export default app;
