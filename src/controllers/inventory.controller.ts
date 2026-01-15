import { Request, Response } from "express";
import { IInventoryController } from "../interfaces/controllers-interfaces/IInventoryController";
import { IInventoryService } from "../interfaces/services-interfaces/IInventoryService";
import { HTTP_STATUS } from "../constants/http-status";

export class InventoryController implements IInventoryController {
    constructor(private inventoryService: IInventoryService) { }

    async addInventory(req: Request, res: Response): Promise<void> {
        try {
            const {
                product_id,
                batch_no,
                quantity,
                purchase_date,
                expiry_date,
                cost_price,
            } = req.body;

            if (!product_id || !batch_no || !quantity || !purchase_date || !cost_price) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: "Missing required inventory fields",
                });
                return;
            }

            const batch = await this.inventoryService.addInventory({
                product_id,
                batch_no,
                quantity,
                purchase_date,
                expiry_date,
                cost_price,
            });

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: batch,
            });
        } catch (error: any) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getInventoryByProduct(req: Request, res: Response): Promise<void> {
        try {
            const { product_id } = req.params;
            const inventory = await this.inventoryService.getByProduct(product_id.toString());

            res.json({
                success: true,
                data: inventory,
            });
        } catch (error: any) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }
}