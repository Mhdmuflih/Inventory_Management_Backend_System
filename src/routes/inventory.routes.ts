import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller";
import InventoryRepository from "../repositories/inventory.repository";
import { InventoryService } from "../services/inventory.service";

const Inventory_Routes = Router();

const inventoryService = new InventoryService(InventoryRepository);
const inventoryController = new InventoryController(inventoryService);

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory inward APIs
 *
 * components:
 *   schemas:
 *     InventoryBatch:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         product_id:
 *           type: string
 *           example: "P001"
 *         batch_no:
 *           type: string
 *           example: "BATCH-01"
 *         quantity:
 *           type: number
 *           example: 10
 *         purchase_date:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         expiry_date:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: "2025-06-01"
 *         cost_price:
 *           type: number
 *           example: 100
 *
 *     AddInventoryRequest:
 *       type: object
 *       required:
 *         - product_id
 *         - batch_no
 *         - quantity
 *         - purchase_date
 *         - cost_price
 *       properties:
 *         product_id:
 *           type: string
 *           example: "P001"
 *         batch_no:
 *           type: string
 *           example: "BATCH-01"
 *         quantity:
 *           type: number
 *           example: 10
 *         purchase_date:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         expiry_date:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: "2025-06-01"
 *         cost_price:
 *           type: number
 *           example: 100
 *
 * /api/inventory/inward:
 *   post:
 *     summary: Add a new inventory batch
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddInventoryRequest'
 *     responses:
 *       201:
 *         description: Inventory added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryBatch'
 *       400:
 *         description: Invalid input or missing fields
 *
 * /api/inventory/product/{product_id}:
 *   get:
 *     summary: Get all inventory batches for a product
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: List of inventory batches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryBatch'
 *       404:
 *         description: Product not found or no inventory
 */

Inventory_Routes.post(
  "/inward",
  inventoryController.addInventory.bind(inventoryController)
);

Inventory_Routes.get(
  "/product/:product_id",
  inventoryController.getInventoryByProduct.bind(inventoryController)
);

export default Inventory_Routes;
