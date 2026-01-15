import { Request, Response } from "express";

export interface IBusinessController {
   createBusiness(req: Request, res: Response): Promise<void>;
   getBusiness(req: Request, res: Response): Promise<void>;
   updateInventoryStrategy(req: Request, res: Response): Promise<void>;
}
