import { IProductRepository } from "../interfaces/repositories-intefaces/IProductRepository";
import { IProductService } from "../interfaces/services-interfaces/IProductService";

export class ProductService implements IProductService {
    constructor(private productRepository: IProductRepository) { }

    async createProduct(name: string, sku: string): Promise<any> {
        const existing = await this.productRepository.findBySku(sku);
        if (existing) {
            throw new Error("SKU already exists");
        }
        return this.productRepository.create(name, sku);
    }

    async getAllProducts(): Promise<any[]> {
        return this.productRepository.findAll();
    }

    async getProductById(id: string): Promise<any> {
        return this.productRepository.findById(id);
    }
}