import { Router } from "express";
import { SaleController } from "../controllers/sale.controller";
import { SaleService } from "../services/sale.service";
import SaleRepository from "../repositories/sale.repository";

const Sale_Routes = Router();

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sales management APIs
 *
 * components:
 *   schemas:
 *     SaleRequest:
 *       type: object
 *       required:
 *         - business_id
 *         - product_id
 *         - quantity
 *       properties:
 *         business_id:
 *           type: string
 *           example: "B001"
 *         product_id:
 *           type: string
 *           example: "P001"
 *         quantity:
 *           type: number
 *           example: 15
 *         batch_no:
 *           type: string
 *           nullable: true
 *           description: Required for BATCH mode
 *           example: "BATCH-02"
 *
 *     SaleDeduction:
 *       type: object
 *       properties:
 *         batch_no:
 *           type: string
 *           example: "BATCH-01"
 *         quantity:
 *           type: number
 *           example: 10
 *
 *     SaleResponse:
 *       type: object
 *       properties:
 *         sale_id:
 *           type: string
 *           example: "S001"
 *         deductions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SaleDeduction'
 *
 * /api/sales:
 *   post:
 *     summary: Create a sale and deduct inventory
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaleRequest'
 *     responses:
 *       201:
 *         description: Sale created successfully with inventory deductions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleResponse'
 *       400:
 *         description: Invalid input, insufficient stock, or missing batch in BATCH mode
 */

const saleService = new SaleService(SaleRepository)
const saleController = new SaleController(saleService);

Sale_Routes.post("/", saleController.createSale.bind(saleController));

export default Sale_Routes;