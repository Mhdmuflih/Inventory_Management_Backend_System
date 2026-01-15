export interface InventoryStrategy {
    deductStock(
        tx: any,
        product_id: string,
        quantity: number,
        batch_no?: string
    ): Promise<{ batch_no: string; quantity: number }[]>;
}
