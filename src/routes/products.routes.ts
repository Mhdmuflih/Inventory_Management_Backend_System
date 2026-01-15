import { Router } from "express";
import ProductRepository from "../repositories/product.repository";
import { ProductService } from "../services/product.service";
import { ProductController } from "../controllers/products.controller";


const Product_Routes = Router();

const productService = new ProductService(ProductRepository);
const productController = new ProductController(productService);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "P001"
 *         name:
 *           type: string
 *           example: "Product A"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "This is a sample product"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2026-01-15T08:00:00.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2026-01-15T09:00:00.000Z"
 *
 *     CreateProductRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Product A"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "This is a sample product"
 *
 *     SuccessMessage:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Product created successfully"
 *
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Missing required fields or invalid data
 *
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *
 * /api/products/{product_id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

Product_Routes.post(
  "/",
  productController.createProduct.bind(productController)
);

Product_Routes.get(
  "/",
  productController.getAllProducts.bind(productController)
);

Product_Routes.get(
  "/:product_id",
  productController.getProductById.bind(productController)
);

export default Product_Routes;
