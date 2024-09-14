import Joi from "joi";

export interface CreateCategoryRequest {
    name: string;
}

export const createCategoryValidator = Joi.object<CreateCategoryRequest>({
    name: Joi.string().min(3).max(15).required()
});


export interface DeleteCategoryRequest {
    id: number;
}

export const deleteCategoryValidator = Joi.object<DeleteCategoryRequest>({
    id: Joi.number().required()
})


export interface UpdateCategoryRequest {
    id: number;
    name: string;
}

export const updateCategoryValidator = Joi.object<UpdateCategoryRequest>({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(15).required()
});


export interface GetCategoryRequest {
    id: number;
}

export const getCategoryValidator = Joi.object<GetCategoryRequest>({
    id: Joi.number().required()
});


export interface ListCategoriesRequest {
    page: number;
    limit: number;
}

export const listCategoriesValidator = Joi.object<ListCategoriesRequest>({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10)
});