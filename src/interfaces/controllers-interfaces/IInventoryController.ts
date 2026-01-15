import { Request, Response } from "express";

export interface IInventoryController {
    addInventory(req: Request, res: Response): Promise<void>;
    getInventoryByProduct(req: Request, res: Response): Promise<void>;
}