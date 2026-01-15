import { InventoryStrategy } from "./InventoryStrategy";

export class BatchStrategy implements InventoryStrategy {
    async deductStock(tx: any, product_id: string, quantity: number, batch_no?: string) {
        if (!batch_no) throw new Error("batch_no is required");

        const batch = await tx.query(
            `SELECT * FROM inventory_batches
             WHERE product_id = $1 AND batch_no = $2`,
            [product_id, batch_no]
        );

        if (!batch.rows[0] || batch.rows[0].quantity < quantity) {
            throw new Error("Insufficient batch stock");
        }

        await tx.query(
            `UPDATE inventory_batches
             SET quantity = quantity - $1
             WHERE id = $2`,
            [quantity, batch.rows[0].id]
        );

        return [{ batch_no, quantity }];
    }
}
