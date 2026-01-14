import pool from "./db";

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("PostgreSQL Connected Successfully");
        client.release();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Failed to connect PostgreSQL.", error.message);
        } else {
            console.log("An unknown error occurred while connecting PostgreSQL.");
        }
        process.exit(1);
    }
}