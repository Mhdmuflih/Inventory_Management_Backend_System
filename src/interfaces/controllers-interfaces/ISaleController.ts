import { Request, Response } from "express";

export interface ISaleController {
    createSale(req: Request, res: Response): Promise<void>;
}