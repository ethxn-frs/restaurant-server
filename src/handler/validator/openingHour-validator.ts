import Joi from "joi";

export interface CreateOpeningHourRequest {
    dayOfWeek: string;
    openingTime: string;
    closingTime: string;
    restaurantId: number;
}

export const createOpeningHourValidator = Joi.object<CreateOpeningHourRequest>({
    dayOfWeek: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
    openingTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    closingTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    restaurantId: Joi.number().required()
});


export interface UpdateOpeningHourRequest {
    id: number;
    dayOfWeek?: string;
    openingTime?: string;
    closingTime?: string;
    restaurantId?: number;
}

export const updateOpeningHourValidator = Joi.object<UpdateOpeningHourRequest>({
    id: Joi.number().required(),
    dayOfWeek: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').optional(),
    openingTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    closingTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    restaurantId: Joi.number().optional()
}).or('dayOfWeek', 'openingTime', 'closingTime', 'restaurantId');


export interface DeleteOpeningHourRequest {
    id: number;
}

export const deleteOpeningHourValidator = Joi.object<DeleteOpeningHourRequest>({
    id: Joi.number().required()
});


export interface GetOpeningHourRequest {
    id: number;
}

export const getOpeningHourValidator = Joi.object<GetOpeningHourRequest>({
    id: Joi.number().required()
});


export interface ListOpeningHoursRequest {
    page: number;
    limit: number;
}

export const listOpeningHoursValidator = Joi.object<ListOpeningHoursRequest>({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10)
});
