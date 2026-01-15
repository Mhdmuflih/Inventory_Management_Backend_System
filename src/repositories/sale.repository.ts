import { ISaleRepository } from "../interfaces/repositories-intefaces/ISaleRepository";

class SaleRepository implements ISaleRepository {
    constructor() { };

async createSale(
        business_id: string,
        product_id: string,
        quantity: number,
        deductions: any[],
        client: any
    ) {
        const sale = await client.query(
            `INSERT INTO sales (business_id, product_id, quantity)
             VALUES ($1, $2, $3)
             RETURNING id`,
            [business_id, product_id, quantity]
        );

        for (const d of deductions) {
            await client.query(
                `INSERT INTO sale_items (sale_id, batch_no, quantity)
                 VALUES ($1, $2, $3)`,
                [sale.rows[0].id, d.batch_no, d.quantity]
            );
        }

        return sale.rows[0];
    }
}

export default new SaleRepository();