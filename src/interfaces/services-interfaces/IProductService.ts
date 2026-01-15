export interface IProductService {
    createProduct(name: string, sku: string): Promise<any>;
    getAllProducts(): Promise<any[]>;
    getProductById(id: string): Promise<any>;
}
