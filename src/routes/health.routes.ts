import { Request, Response, Router } from "express";
import { HTTP_STATUS } from "../constants/http-status";

const Health_Routes = Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: API health check endpoint
 *
 * /api/health:
 *   get:
 *     summary: Check if the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: ok
 *                 time:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-01-15T08:00:00.000Z
 */

Health_Routes.get('/health', (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.SUCCESS).json({success: "ok", time: new Date().toISOString()});
});

export default Health_Routes;