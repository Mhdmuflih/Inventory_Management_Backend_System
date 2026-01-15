export interface IInventoryRepository {
    checkProductExists(product_id: string): Promise<boolean>;
    createBatch(data: any): Promise<any>;
    findByProduct(product_id: string): Promise<any[]>;
}
