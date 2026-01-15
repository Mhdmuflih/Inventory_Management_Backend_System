import pool from "../configs/db";
import { IProductRepository } from "../interfaces/repositories-intefaces/IProductRepository";

class ProductRepository implements IProductRepository {
    constructor() { }

    async create(name: string, sku: string): Promise<any> {
        const result = await pool.query(
            `INSERT INTO products (name, sku)
             VALUES ($1, $2)
             RETURNING id, name, sku`,
            [name, sku]
        );
        return result.rows[0];
    }

    async findAll(): Promise<any[]> {
        const result = await pool.query(
            `SELECT id, name, sku FROM products ORDER BY created_at DESC`
        );
        return result.rows;
    }

    async findById(id: string): Promise<any> {
        const result = await pool.query(
            `SELECT id, name, sku FROM products WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    }

    async findBySku(sku: string): Promise<any> {
        const result = await pool.query(
            `SELECT id FROM products WHERE sku = $1`,
            [sku]
        );
        return result.rows[0];
    }
}

export default new ProductRepository();