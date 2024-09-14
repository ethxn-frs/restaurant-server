import Joi from "joi";

export interface CreateRestaurantRequest {
    name: string;
    description: string;
    phoneNumber: string;
    address: string;
    email: string;
    twitter: string;
    facebook: string;
    snapchat: string;
    instagram: string;
}

export const createRestaurantValidator = Joi.object<CreateRestaurantRequest>({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(255).required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).required(), // Format général pour les numéros de téléphone
    address: Joi.string().min(10).max(255).required(),
    email: Joi.string().email().required(),
    twitter: Joi.string().max(255).required(),
    facebook: Joi.string().max(255).required(),
    snapchat: Joi.string().max(255).required(),
    instagram: Joi.string().max(255).required(),
});


export interface UpdateRestaurantRequest {
    id: number;
    name?: string;
    description?: string;
    phoneNumber?: string;
    address?: string;
    email?: string;
    twitter?: string;
    facebook?: string;
    snapchat?: string;
    instagram?: string;
}

export const updateRestaurantValidator = Joi.object<UpdateRestaurantRequest>({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(50).optional(),
    description: Joi.string().min(10).max(255).optional(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
    address: Joi.string().min(10).max(255).optional(),
    email: Joi.string().email().optional(),
    twitter: Joi.string().max(255).optional(),
    facebook: Joi.string().max(255).optional(),
    snapchat: Joi.string().max(255).optional(),
    instagram: Joi.string().max(255).optional(),
}).or('name', 'description', 'phoneNumber', 'address', 'email', 'twitter', 'facebook', 'snapchat', 'instagram');


export interface DeleteRestaurantRequest {
    id: number;
}

export const deleteRestaurantValidator = Joi.object<DeleteRestaurantRequest>({
    id: Joi.number().required()
});