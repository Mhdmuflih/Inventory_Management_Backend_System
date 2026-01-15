import pool from "../configs/db";
import { IBusinessRepository } from "../interfaces/repositories-intefaces/IBusinessRepository";

class BusinessRepository implements IBusinessRepository {
    constructor() { }

    async create(name: string): Promise<any> {
        try {
            const result = await pool.query(
                `INSERT INTO business (name, out_mode)
                VALUES ($1, 'FIFO')
                RETURNING id, name, out_mode`,
                [name]
            );
            return result.rows[0];
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in business: ${error.message}`);
            }
            throw new Error("Unknown error in create business");
        }
    }

    async findById(id: string): Promise<any> {
        try {
            const result = await pool.query(
                `SELECT id, name, out_mode
                FROM business
                WHERE id = $1`,
                [id]
            );
            return result.rows[0];
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in business: ${error.message}`);
            }
            throw new Error("Unknown error in create business");
        }
    }

    async updateOneMode(id: string, mode: string): Promise<any> {
        try {

            const result: any = await pool.query(
                `UPDATE business
                SET out_mode = $1
                WHERE id = $2
                RETURNING id`,
                [mode, id]
            );

            return result.rowCount > 0;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in business: ${error.message}`);
            }
            throw new Error("Unknown error in create business");
        }
    }
}

export default new BusinessRepository();