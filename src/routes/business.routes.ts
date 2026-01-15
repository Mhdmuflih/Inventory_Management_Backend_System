import { Router } from "express";
import { BusinessController } from "../controllers/business.controller";
import { BusinessService } from "../services/business.service";
import BusinessRepository from "../repositories/business.repository";

const Business_Routes = Router();

const businessService = new BusinessService(BusinessRepository);
const businessController = new BusinessController(businessService);

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Business configuration APIs
 *
 * components:
 *   schemas:
 *     Business:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         name:
 *           type: string
 *           example: "ABC Stores"
 *         out_mode:
 *           type: string
 *           enum: [FIFO, FEFO, BATCH]
 *           example: FIFO
 *
 *     CreateBusinessRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "ABC Stores"
 *
 *     InventoryConfigRequest:
 *       type: object
 *       required:
 *         - out_mode
 *       properties:
 *         out_mode:
 *           type: string
 *           enum: [FIFO, FEFO, BATCH]
 *           example: FIFO
 *
 *     SuccessMessage:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Business created successfully"
 *
 * /api/business:
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBusinessRequest'
 *     responses:
 *       201:
 *         description: Business created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Missing required fields or invalid data
 *
 * /api/business/{business_id}:
 *   get:
 *     summary: Get details of a business
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the business
 *     responses:
 *       200:
 *         description: Business details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 *
 * /api/business/{business_id}/inventory-config:
 *   post:
 *     summary: Update inventory outflow strategy for a business
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the business
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryConfigRequest'
 *     responses:
 *       200:
 *         description: Inventory strategy updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Invalid out_mode or business not found
 */


Business_Routes.post(
    "/",
    businessController.createBusiness.bind(businessController)
);

Business_Routes.get(
    "/:business_id",
    businessController.getBusiness.bind(businessController)
);

Business_Routes.post(
    "/:business_id/inventory-config",
    businessController.updateInventoryStrategy.bind(businessController)
);



export default Business_Routes;