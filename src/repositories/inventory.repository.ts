import pool from "../configs/db";
import { IInventoryRepository } from "../interfaces/repositories-intefaces/IInventoryRepository";

class InventoryRepository implements IInventoryRepository {
    constructor() { };

    async checkProductExists(product_id: string): Promise<boolean> {
        const result:any = await pool.query(
            `SELECT id FROM products WHERE id = $1`,
            [product_id]
        );
        return result.rowCount > 0;
    }

    async createBatch(data: any): Promise<any> {
        const result = await pool.query(
            `INSERT INTO inventory_batches
             (product_id, batch_no, quantity, purchase_date, expiry_date, cost_price)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
                data.product_id,
                data.batch_no,
                data.quantity,
                data.purchase_date,
                data.expiry_date || null,
                data.cost_price,
            ]
        );
        return result.rows[0];
    }

    async findByProduct(product_id: string): Promise<any[]> {
        const result = await pool.query(
            `SELECT *
             FROM inventory_batches
             WHERE product_id = $1
             ORDER BY purchase_date ASC`
        );
        return result.rows;
    }
}

export default new InventoryRepository();