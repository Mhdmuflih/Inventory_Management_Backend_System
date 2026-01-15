export interface IBusinessService {
    createBusiness(name: string): Promise<any>;
    getBusiness(business_id: string): Promise<any>;
    updateOutMode(business_id: string, out_mode: string): Promise<any>;
}