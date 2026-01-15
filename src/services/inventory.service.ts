import { IInventoryRepository } from "../interfaces/repositories-intefaces/IInventoryRepository";
import { IInventoryService } from "../interfaces/services-interfaces/IInventoryService";

export class InventoryService implements IInventoryService {
    constructor(private inventoryRepository: IInventoryRepository) { };

    async addInventory(data: any): Promise<any> {
        // Product existence validation (important!)
        const product = await this.inventoryRepository.checkProductExists(
            data.product_id
        );

        if (!product) {
            throw new Error("Invalid product_id");
        }

        return this.inventoryRepository.createBatch(data);
    }

    async getByProduct(product_id: string): Promise<any[]> {
        return this.inventoryRepository.findByProduct(product_id);
    }
}