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