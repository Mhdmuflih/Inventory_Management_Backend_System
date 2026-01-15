import { Request, Response } from "express";
import { IProductsController } from "../interfaces/controllers-interfaces/IProductsController";
import { IProductService } from "../interfaces/services-interfaces/IProductService";
import { HTTP_STATUS } from "../constants/http-status";

export class ProductController implements IProductsController {
    constructor(private productService: IProductService) {};


    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const { name, sku } = req.body;

            if (!name || !sku) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: "Product name and SKU are required",
                });
                return;
            }

            const product = await this.productService.createProduct(name, sku);

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: product,
            });
        } catch (error: any) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: error.message,
            });
        }
    }


    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.getAllProducts();
            res.json({ success: true, data: products });
        } catch (error: any) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const { product_id } = req.params;
            const product = await this.productService.getProductById(product_id.toString());

            if (!product) {
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    message: "Product not found",
                });
                return;
            }

            res.json({ success: true, data: product });
        } catch (error: any) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: error.message,
            });
        }
    }

}