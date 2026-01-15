import pool from "../configs/db";
import { ISaleRepository } from "../interfaces/repositories-intefaces/ISaleRepository";
import { ISaleService } from "../interfaces/services-interfaces/ISaleService";
import { StrategyFactory } from "../strategies/StrategyFactory";

export class SaleService implements ISaleService {
    constructor(private saleRepository: ISaleRepository) { }

    async createSale(data: any) {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const business = await client.query(
                `SELECT out_mode FROM business WHERE id = $1`,
                [data.business_id]
            );

            const strategy = StrategyFactory.getStrategy(business.rows[0].out_mode);

            const deductions = await strategy.deductStock(
                client,
                data.product_id,
                data.quantity,
                data.batch_no
            );

            const sale = await this.saleRepository.createSale(
                data.business_id,
                data.product_id,
                data.quantity,
                deductions,
                client
            );

            await client.query("COMMIT");

            return { sale_id: sale.id, deductions };
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }
}