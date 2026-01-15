Backend Machine Test – Inventory Management System
Candidate

Muhammed Muflih K K

1 Tech Stack

Language: TypeScript (Node.js)
Framework: Express.js
Database: PostgreSQL
Database Access: pg library (raw queries)
Other Packages: dotenv, swagger-jsdoc (optional for API docs)

2️ Project Structure (as per your actual project)

configs/
 ├── database.connection.ts      # PG Pool
 ├── env.config.ts               # Environment variables
 ├── swagger.ts                  # Swagger setup
 └── db.ts                       # Optional DB helpers

constants/
 ├── http-status.ts
 └── messages.ts

controllers/
 ├── business.controller.ts
 ├── inventory.controller.ts
 ├── products.controller.ts
 └── sale.controller.ts

interfaces/
 ├── controllers-interfaces/
 │    ├── IBusinessController.ts
 │    ├── IInventoryController.ts
 │    ├── IProductsController.ts
 │    └── ISaleController.ts
 ├── repositories-intefaces/
 │    ├── IBusinessRepository.ts
 │    ├── IInventoryRepository.ts
 │    ├── IProductRepository.ts
 │    └── ISaleRepository.ts
 ├── services-interfaces/
 │    ├── IBusinessService.ts
 │    ├── IInventoryService.ts
 │    ├── IProductService.ts
 │    └── ISaleService.ts
 └── interface.ts                # generic types

logger/
middlewares/
 └── logger.middleware.ts

models/                          # Optional for defining TS types for DB rows

repositories/
 ├── business.repository.ts
 ├── inventory.repository.ts
 ├── product.repository.ts
 └── sale.repository.ts

routes/
 ├── business.routes.ts
 ├── health.routes.ts
 ├── inventory.routes.ts
 ├── products.routes.ts
 └── sale.routes.ts

services/
 ├── business.service.ts
 ├── inventory.service.ts
 ├── product.service.ts
 └── sale.service.ts

strategies/
 ├── Batch.strategy.ts
 ├── FEFO.strategy.ts
 ├── FIFO.strategy.ts
 ├── InventoryStrategy.ts       # interface
 └── StrategyFactory.ts         # selects strategy based on business config

utilities/

app.ts
server.ts


3️ Database Schema (PostgreSQL)

Business
--------------
CREATE TABLE business (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    out_mode VARCHAR(10) DEFAULT 'FIFO'
);

Products
-----------
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    price NUMERIC(10,2) NOT NULL
);

Inventory Batches
--------------------
CREATE TABLE inventory_batches (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    batch_no VARCHAR(50),
    quantity INT NOT NULL,
    purchase_date DATE,
    expiry_date DATE,
    cost_price NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Sales
---------------
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    business_id INT REFERENCES business(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Sale Items / Inventory Transactions
------------------------------------
CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(id),
    batch_no VARCHAR(50),
    quantity INT NOT NULL
);


4️ APIs (Routes)

| Method | Endpoint                       | Description               |
| ------ | ------------------------------ | ------------------------- |
| POST   | /business                      | Create business           |
| GET    | /business/:id                  | Get business details      |
| POST   | /business/:id/inventory-config | Update inventory strategy |


| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | /products     | Add product       |
| GET    | /products     | List products     |
| GET    | /products/:id | Get product by ID |

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | /inventory            | Add stock batch   |
| GET    | /inventory/:productId | Get product stock |

| Method | Endpoint | Description                            |
| ------ | -------- | -------------------------------------- |
| POST   | /sales   | Create sale (deduct stock by strategy) |


5️ Inventory Deduction Logic (Strategy Pattern)

FIFO: Consume oldest batches first (purchase_date ASC)
FEFO: Consume batches with earliest expiry_date ASC
BATCH: Deduct only from specified batch, fail if insufficient

6️ Setup Instructions

Clone repo:
git clone https://github.com/Mhdmuflih/Inventory_Management_Backend_System.git
cd Inventory_Management_Backend_System

Install dependencies:
npm install


7️ How to test APIs

Create Business
POST /api/business
{
  "name": "ABC Stores"
}

Add Product
POST /api/products
{
  "name": "Product A",
  "sku": "PROD-A",
  "price": 100
}

Add Inventory Batch
POST /api/inventory
{
  "productId": 1,
  "batchNo": "BATCH-01",
  "quantity": 50,
  "purchaseDate": "2025-01-01",
  "expiryDate": "2025-06-01",
  "costPrice": 100
}

Sale (FIFO / FEFO / Batch)
POST /api/sales
{
  "productId": 1,
  "quantity": 10,
  "strategy": "FIFO"
}


8️ Assumptions / Notes

Default business strategy = FIFO
Partial batch consumption supported
All operations atomic / transaction-safe using PostgreSQL
Strategy pattern is used → easy to extend to new strategies like LIFO
Only core modules implemented: Business, Products/Inventory, Sales


9️ GitHub Submission

Repository: Public
Clear commit history
All code + README included