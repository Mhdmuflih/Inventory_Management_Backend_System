import dotenv from "dotenv";

dotenv.config();


// Server PORT
export const PORT = Number(process.env.PORT) || 3000;


// PostgreSQL database
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

// PostgreSQL database connection pooling
export const DB_POOL_MAX = Number(process.env.DB_POOL_MAX);
export const DB_IDLE_TIMEOUT = Number(process.env.DB_IDLE_TIMEOUT);
export const DB_CONN_TIMEOUT = Number(process.env.DB_CONN_TIMEOUT);

// swagger data
export const SWAGGER_SERVER_URL = process.env.SWAGGER_SERVER_URL;
export const SWAGGER_SERVER_DESC = process.env.SWAGGER_SERVER_DESC;