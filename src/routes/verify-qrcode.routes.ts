import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { verifyQrCode } from "../controllers/qrcode.controller.js";

const router = Router();

// POST /api/verify-qrcode
router.post("/", authenticateToken, (req, res, next) => {
  verifyQrCode(req, res).catch(next);
});

export { router };
