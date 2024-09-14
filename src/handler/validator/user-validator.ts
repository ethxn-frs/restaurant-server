import Joi from "joi";

export interface InviteUserRequest {
    firstName: string;
    lastName: string;
    email: string;
}

export const inviteUserValidator = Joi.object<InviteUserRequest>({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required()
});


export interface UpdateUserRequest {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}

export const updateUserValidator = Joi.object<UpdateUserRequest>({
    id: Joi.number().required(),
    firstName: Joi.string().min(3).max(20).optional(),
    lastName: Joi.string().min(3).max(20).optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.alternatives().try(
        Joi.string().pattern(/^\+?[0-9\s\-()]*$/).min(7).max(15),
        Joi.string().allow('')
    ).optional(),
});


export interface DeleteUserRequest {
    id: number;
}

export const deleteUserValidator = Joi.object<DeleteUserRequest>({
    id: Joi.number().required()
});


export interface GetUserRequest {
    id: number;
}

export const getUserValidator = Joi.object<GetUserRequest>({
    id: Joi.number().required()
});


export interface ListUserRequest {
    page: number;
    limit: number;
}

export const listUserValidator = Joi.object<ListUserRequest>({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10)
});


export interface ChangePasswordRequest {
    id: number;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export const changePasswordValidator = Joi.object<ChangePasswordRequest>({
    id: Joi.number().required(),
    currentPassword: Joi.string().min(1).required(),
    newPassword: Joi.string().min(1).max(25).required(),
    confirmNewPassword: Joi.string().min(1).max(25).required(),
})


export interface LoginRequest {
    email: string;
    password: string
}

export const loginValidator = Joi.object<LoginRequest>({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
})


export interface ForgetPasswordRequest {
    email: string;
}

export const forgetPasswordValidator = Joi.object<ForgetPasswordRequest>({
    email: Joi.string().email().required()
})