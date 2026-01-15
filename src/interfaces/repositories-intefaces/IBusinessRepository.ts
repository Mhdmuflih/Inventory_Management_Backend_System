export interface IBusinessRepository {
    create(name: string): Promise<any>;
    findById(id: string): Promise<any>;
    updateOneMode(id: string, mode: string): Promise<any>;
}