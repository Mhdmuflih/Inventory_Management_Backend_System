import express, { Application } from "express";
import Health_Routes from "./routes/health.routes";
import Business_Routes from "./routes/business.routes";
import Inventory_Routes from "./routes/inventory.routes";
import Sale_Routes from "./routes/sale.routes";

const app: Application = express();

app.use('/api', Health_Routes);
app.use('/api/business', Business_Routes);
app.use('/api/inventory', Inventory_Routes);
app.use('/api/sales', Sale_Routes);

export default app;