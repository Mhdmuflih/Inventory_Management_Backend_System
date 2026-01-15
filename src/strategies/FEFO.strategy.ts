import { InventoryStrategy } from "./InventoryStrategy";

export class FefoStrategy implements InventoryStrategy {
    async deductStock(tx: any, product_id: string, quantity: number) {
        const batches = await tx.query(
            `SELECT * FROM inventory_batches
             WHERE product_id = $1
             AND quantity > 0
             AND (expiry_date IS NULL OR expiry_date >= CURRENT_DATE)
             ORDER BY expiry_date ASC`,
            [product_id]
        );

        let remaining = quantity;
        const deductions = [];

        for (const batch of batches.rows) {
            if (remaining <= 0) break;

            const deduct = Math.min(batch.quantity, remaining);

            await tx.query(
                `UPDATE inventory_batches
                 SET quantity = quantity - $1
                 WHERE id = $2`,
                [deduct, batch.id]
            );

            deductions.push({ batch_no: batch.batch_no, quantity: deduct });
            remaining -= deduct;
        }

        if (remaining > 0) throw new Error("Insufficient stock");

        return deductions;
    }
}
