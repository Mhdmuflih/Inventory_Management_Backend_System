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
