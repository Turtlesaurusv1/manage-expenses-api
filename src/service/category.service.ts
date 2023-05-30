import { AppDataSource } from "../data-source";
import { CategoryEntities } from "../entity/category";

export class CateoryService {
    private categoryRepository = AppDataSource.getRepository(CategoryEntities)

    async createCate(body: any){
        try {
            const {} = body;
        } catch (error) {
            throw error
        }
    }
}