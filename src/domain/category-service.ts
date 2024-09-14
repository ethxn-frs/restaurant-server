import {DataSource, DeleteResult, Repository, UpdateResult} from "typeorm";
import {Category} from "../database/entity/category";
import {
    CreateCategoryRequest,
    ListCategoriesRequest,
    UpdateCategoryRequest
} from "../handler/validator/category-validator";

export class CategoryService {

    private categoryRepository: Repository<Category>;

    constructor(private readonly db: DataSource) {
        this.categoryRepository = this.db.getRepository(Category);
    }

    async getAllCategories(listRequest: ListCategoriesRequest): Promise<Category[]> {
        try {
            const { page, limit } = listRequest;
            const skip = (page - 1) * limit;

            return await this.categoryRepository.find({
                skip,
                take: limit,
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw new Error('Could not fetch categories');
        }
    }

    async getCategoryById(id: number): Promise<Category | Error> {
        try {
            const category = await this.categoryRepository.findOne({
                where: {id},
                relations: ['items'],
            });

            if (!category) {
                return new Error(`Category with ID ${id} not found`);
            }

            return category;
        } catch (error) {
            console.error(`Error fetching category with ID ${id}:`, error);
            return new Error('Could not fetch the category');
        }
    }

    async createCategory(categoryRequest: CreateCategoryRequest): Promise<Category | Error> {
        try {
            const category = this.categoryRepository.create(categoryRequest);
            return await this.categoryRepository.save(category);
        } catch (error) {
            console.error('Error creating category:', error);
            return new Error('Could not create the category');
        }
    }

    async deleteCategory(id: number): Promise<DeleteResult> {
        try {
            return await this.categoryRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting category with ID ${id}:`, error);
            throw new Error('Could not delete the category');
        }
    }

    async updateCategory(categoryRequest: UpdateCategoryRequest): Promise<UpdateResult | Error> {
        try {
            const {id, name} = categoryRequest;
            return await this.categoryRepository.update(id, {name});
        } catch (error) {
            console.error(`Error updating category with ID ${categoryRequest.id}:`, error);
            return new Error('Could not update the category');
        }
    }
}
