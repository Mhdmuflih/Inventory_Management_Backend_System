import { Request, Response } from "express";

export interface IProductsController {
    createProduct(req: Request, res: Response): Promise<void>;
    getAllProducts(req: Request, res: Response): Promise<void>;
    getProductById(req: Request, res: Response): Promise<void>;

}