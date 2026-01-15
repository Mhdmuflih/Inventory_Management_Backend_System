import { MESSAGES } from "../constants/messages";
import { IBusinessRepository } from "../interfaces/repositories-intefaces/IBusinessRepository";
import { IBusinessService } from "../interfaces/services-interfaces/IBusinessService";

export class BusinessService implements IBusinessService {
    constructor(private businessRepository: IBusinessRepository) { };

    async createBusiness(name: string): Promise<any> {
        try {
            const business = await this.businessRepository.create(name);
            if (!business) {
                throw new Error(MESSAGES.FAILED_TO_CREATE);
            }
            return business;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to create business service.", error.message);
                throw new Error(`Error creating business servcie ${error.message}`);
            }
        }
    }

    async getBusiness(business_id: string): Promise<any> {
        try {
            const business = await this.businessRepository.findById(business_id);
            if (!business) {
                throw new Error(MESSAGES.CAN_NOT_GET_DATA);
            }
            return business;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to get business service.", error.message);
                throw new Error(`Error get business servcie ${error.message}`);
            }
        }
    }

    async updateOutMode(business_id: string, out_mode: string): Promise<any> {
        try {
            const updateData = await this.businessRepository.updateOneMode(business_id, out_mode);
            if (!updateData) {
                throw new Error(MESSAGES.CAN_NOT_UPDATED_DATA);
            }
            return updateData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to update business service.", error.message);
                throw new Error(`Error update business servcie ${error.message}`);
            }
        }
    }
}