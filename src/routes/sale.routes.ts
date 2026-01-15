import { Router } from "express";
import { SaleController } from "../controllers/sale.controller";
import { SaleService } from "../services/sale.service";
import SaleRepository from "../repositories/sale.repository";

const Sale_Routes = Router();

const saleService = new SaleService(SaleRepository)
const saleController = new SaleController(saleService);

Sale_Routes.post("/", saleController.createSale.bind(saleController));

export default Sale_Routes;