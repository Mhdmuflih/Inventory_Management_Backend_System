export interface ISaleRepository {
    createSale(business_id: string, product_id: string, quantity: number, deductions: any[], client: any): Promise<any>;
}