import { Pool } from "pg";
import { DB_CONN_TIMEOUT, DB_HOST, DB_IDLE_TIMEOUT, DB_NAME, DB_PASSWORD, DB_POOL_MAX, DB_PORT, DB_USER } from "./env.config";

const pool = new Pool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,

    max: DB_POOL_MAX || 10,        // max connections
    idleTimeoutMillis: DB_IDLE_TIMEOUT || 30000, // close idle clients
    connectionTimeoutMillis: DB_CONN_TIMEOUT || 2000, // wait time
});

export default pool;