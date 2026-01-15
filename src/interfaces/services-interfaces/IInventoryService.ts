export interface IInventoryService {
    addInventory(data: any): Promise<any>;
    getByProduct(product_id: string): Promise<any[]>;
}
