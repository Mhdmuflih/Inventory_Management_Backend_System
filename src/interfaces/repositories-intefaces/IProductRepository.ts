export interface IProductRepository {
    create(name: string, sku: string): Promise<any>;
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any>;
    findBySku(sku: string): Promise<any>;
}
