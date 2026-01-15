import { Request, Response } from "express";
import { ISaleController } from "../interfaces/controllers-interfaces/ISaleController";
import { ISaleService } from "../interfaces/services-interfaces/ISaleService";

export class SaleController implements ISaleController {
    constructor(private saleService: ISaleService) {}

    async createSale(req: Request, res: Response) {
        try {
            const result = await this.saleService.createSale(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}