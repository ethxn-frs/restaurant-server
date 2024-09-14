import {DataSource, DeleteResult, ILike, Repository, UpdateResult} from "typeorm";
import {Item} from "../database/entity/item";
import {CreateItemRequest, ListItemsRequest, UpdateItemRequest} from "../handler/validator/item-validator";
import {CategoryService} from "./category-service";
import {Category} from "../database/entity/category";


export class ItemService {

    private itemRepository: Repository<Item>;
    private categoryRepository: Repository<Category>;
    private categoryService: CategoryService;

    constructor(private readonly db: DataSource) {
        this.itemRepository = this.db.getRepository(Item);
        this.categoryRepository = this.db.getRepository(Category);
        this.categoryService = new CategoryService(this.db);
    }

    async getAllItems(listRequest: ListItemsRequest): Promise<[Item[], number]> {
        try {
            const {page, limit, categoryId, type, search} = listRequest;
            const skip = (page - 1) * limit;

            const where: any = {};

            if (categoryId) {
                where.category = {id: categoryId};
            }

            if (type) {
                where.type = type;
            }

            if (search && search.length > 0) {
                where.name = ILike(`%${search}%`);
            }

            const [items, count] = await this.itemRepository.findAndCount({
                skip,
                take: limit,
                relations: ['category'],
                where
            });

            return [items, count];
        } catch (error) {
            console.error('Error fetching items:', error);
            throw new Error('Could not fetch items');
        }
    }

    async getItemById(id: number): Promise<Item> {
        try {
            const item = await this.itemRepository.findOne({
                where: {id},
                relations: ['category'],
            });

            if (!item) {
                throw new Error(`Item with ID ${id} not found`);
            }

            return item;
        } catch (error) {
            console.error(`Error fetching item with ID ${id}:`, error);
            throw new Error('Could not fetch the item');
        }
    }

    async createItem(itemRequest: CreateItemRequest): Promise<Item> {
        try {
            const category = await this.categoryService.getCategoryById(itemRequest.categoryId);

            if (!category) {
                throw new Error(`Category with ID ${itemRequest.categoryId} not found`);
            }

            const item = this.itemRepository.create({
                ...itemRequest,
                category,
            });

            return await this.itemRepository.save(item);
        } catch (error) {
            console.error('Error creating item:', error);
            throw new Error('Could not create the item');
        }
    }

    async updateItem(itemRequest: UpdateItemRequest): Promise<UpdateResult> {
        try {
            const {id, name, description, price, categoryId, type} = itemRequest;

            const item = await this.itemRepository.findOne({where: {id}});

            if (!item) {
                throw new Error(`Item with ID ${id} not found`);
            }

            if (categoryId) {
                const category = await this.categoryRepository.findOne({where: {id: categoryId}});
                if (!category) {
                    throw new Error(`Category with ID ${categoryId} not found`);
                }
                item.category = category;
            }

            if (name) item.name = name;
            if (description) item.description = description;
            if (price) item.price = price;
            if (type) item.type = type

            return await this.itemRepository.update(id, item);
        } catch (error) {
            console.error(`Error updating item with ID ${itemRequest.id}:`, error);
            throw new Error('Could not update the item');
        }
    }

    async deleteItem(id: number): Promise<DeleteResult> {
        try {
            return await this.itemRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting item with ID ${id}:`, error);
            throw new Error('Could not delete the item');
        }
    }
}