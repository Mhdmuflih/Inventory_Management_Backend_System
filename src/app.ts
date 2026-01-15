import express, { Application, Request, Response } from "express";
import cors from "cors";
import Health_Routes from "./routes/health.routes";
import Business_Routes from "./routes/business.routes";
import Inventory_Routes from "./routes/inventory.routes";
import Sale_Routes from "./routes/sale.routes";
import { swaggerSpec, swaggerUi } from "./configs/swagger";
import { HTTP_STATUS } from "./constants/http-status";
import { MESSAGES } from "./constants/messages";
import morgan from "morgan";
import compression from "compression";
import logger from "./middlewares/logger.middleware";

const app: Application = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(compression());

// Custom logging middleware
// ============================================================
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});
// ============================================================

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Docs Route
// ============================================================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ============================================================


// Routes
// ============================================================
app.use('/api', Health_Routes);
app.use('/api/business', Business_Routes);
app.use('/api/inventory', Inventory_Routes);
app.use('/api/sales', Sale_Routes);
// ============================================================


// 404 error throw // after all routes
// ============================================================
app.all(/.*/, (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.ROUTE_NOT_FOUND });
});
// ============================================================

export default app;