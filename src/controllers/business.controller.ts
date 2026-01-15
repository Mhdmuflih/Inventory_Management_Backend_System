import { Request, Response } from "express";
import { IBusinessController } from "../interfaces/controllers-interfaces/IBusinessController";
import { HTTP_STATUS } from "../constants/http-status";
import { IBusinessService } from "../interfaces/services-interfaces/IBusinessService";

export class BusinessController implements IBusinessController {
    constructor(private businessService: IBusinessService) { }

    async createBusiness(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;
            if (!name) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Business name is required" })
            }

            const business = await this.businessService.createBusiness(name);

            if (!business) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "business create failed!" });
            }
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: "Business created Successfully." });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to business controller.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log(" Unknown error during business creation.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occured while business creation." });
        }
    }


    async getBusiness(req: Request, res: Response): Promise<void> {
        try {
            const { business_id } = req.params;

            const business = await this.businessService.getBusiness(business_id.toString());

            if (!business) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Business not found" });
            }

            res.json({
                success: true,
                data: business,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to business controller.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log(" Unknown error during get business.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occured while get business." });
        }
    }

    async updateInventoryStrategy(req: Request, res: Response): Promise<void> {
        try {
            const { business_id } = req.params;
            const { out_mode } = req.body;

            const allowedModes = ["FIFO", "FEFO", "BATCH"];

            if (!allowedModes.includes(out_mode)) {
                res.status(400).json({ message: "Invalid out_mode. Use FIFO | FEFO | BATCH" });
            }

            const updated = await this.businessService.updateOutMode(business_id.toString(), out_mode);

            if (!updated) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Business not found" });
            }

            res.json({ success: true, message: "Inventory strategy updated", });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to business controller.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log(" Unknown error during business creation.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occured while business creation." });
        }
    }
}