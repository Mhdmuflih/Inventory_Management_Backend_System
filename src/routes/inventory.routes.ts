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
