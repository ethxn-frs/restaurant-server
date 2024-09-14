import Joi from "joi";

export interface CreateItemRequest {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    type: string;
}

export const createItemValidator = Joi.object<CreateItemRequest>({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(255).required(),
    price: Joi.number().positive().precision(2).required(),
    categoryId: Joi.number().required(),
    type: Joi.string().valid('Entrée', 'Plat', 'Dessert', 'Boisson').required(),
});


export interface UpdateItemRequest {
    id: number;
    name?: string;
    description?: string;
    price?: number;
    categoryId?: number;
    type?: string;
}

export const updateItemValidator = Joi.object<UpdateItemRequest>({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(50).optional(),
    description: Joi.string().min(5).max(255).optional(),
    price: Joi.number().positive().precision(2).optional(),
    categoryId: Joi.number().optional(),
    type: Joi.string().valid('Entrée', 'Plat', 'Dessert', 'Boisson').optional(),
}).or('name', 'description', 'price', 'categoryId', "type");


export interface DeleteItemRequest {
    id: number;
}

export const deleteItemValidator = Joi.object<DeleteItemRequest>({
    id: Joi.number().required()
});


export interface GetItemRequest {
    id: number;
}

export const getItemValidator = Joi.object<GetItemRequest>({
    id: Joi.number().required(),
})


export interface ListItemsRequest {
    page: number;
    limit: number;
    categoryId?: number;
    type?: string;
    search?: string;
}

export const listItemsValidator = Joi.object<ListItemsRequest>({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    categoryId: Joi.string().optional(),
    type: Joi.string().valid('Entrée', 'Plat', 'Dessert', 'Boisson').optional(),
    search: Joi.string().max(25).optional().allow('')
});