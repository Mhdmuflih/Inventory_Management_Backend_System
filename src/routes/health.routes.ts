import { Request, Response, Router } from "express";
import { HTTP_STATUS } from "../constants/http-status";

const Health_Routes = Router();

Health_Routes.get('/health', (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.SUCCESS).json({success: "ok", time: new Date().toISOString()});
});

export default Health_Routes;