import Joi from "joi";


export interface CreatePaymentMethodRequest {
    name: string;
    active: boolean
}

export const createPaymentMethodValidator = Joi.object<CreatePaymentMethodRequest>({
    name: Joi.string().min(1).max(50).required(),
    active: Joi.boolean().required()
});


export interface UpdatePaymentMethodRequest {
    id: number;
    name?: string;
    active?: boolean;
}

export const updatePaymentMethodValidator = Joi.object<UpdatePaymentMethodRequest>({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(50).optional(),
    active: Joi.boolean().optional(),
});

export interface DeletePaymentMethodRequest {
    id: number;
}

export const deletePaymentMethodValidator = Joi.object<DeletePaymentMethodRequest>({
    id: Joi.number().required()
});


export interface GetPaymentMethodRequest {
    id: number;
}

export const getPaymentMethodValidator = Joi.object<GetPaymentMethodRequest>({
    id: Joi.number().required()
});


export interface ListPaymentMethodsRequest {
    page: number;
    limit: number;
}

export const listPaymentMethodsValidator = Joi.object<ListPaymentMethodsRequest>({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10)
});