import {AppDataSource} from "../database/database";
import express, {Request, Response} from "express";
import {UserService} from "../domain/user-service";
import {
    changePasswordValidator,
    deleteUserValidator,
    forgetPasswordValidator,
    getUserValidator,
    inviteUserValidator,
    listUserValidator,
    updateUserValidator
} from "./validator/user-validator";

const userService = new UserService(AppDataSource);

export const userRoutes = (app: express.Express) => {

    app.get("/users", async (req: Request, res: Response) => {
        try {
            const listRequestValidate = listUserValidator.validate(req.query);

            if (listRequestValidate.error) {
                return res.status(400).json({message: listRequestValidate.error.message});
            }

            const [users, count] = await userService.getAllUsers(listRequestValidate.value);
            res.status(200).send({users, count});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });

    app.post("/users/invite", async (req: Request, res: Response) => {
        try {
            const inviteUserValidate = inviteUserValidator.validate(req.body);
            if (inviteUserValidate.error) {
                return res.status(400).json({message: inviteUserValidate.error.message});
            }
            const [result, message] = await userService.sendInvitationToUser(inviteUserValidate.value);
            res.status(200).json({result, message});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.get("/users/:id", async (req: Request, res: Response) => {
        try {
            const idUserValidate = getUserValidator.validate(req.params);
            if (idUserValidate.error) {
                return res.status(400).json({message: idUserValidate.error.message});
            }
            const result = await userService.getUserById(idUserValidate.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.delete("/users/:id", async (req: Request, res: Response) => {
        try {
            const idUserValidate = deleteUserValidator.validate(req.params);
            if (idUserValidate.error) {
                return res.status(400).json({message: idUserValidate.error.message});
            }
            const result = await userService.deleteUser(idUserValidate.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.put("/users/:id", async (req: Request, res: Response) => {
        try {
            const updateUserValidate = updateUserValidator.validate({...req.params, ...req.body});
            if (updateUserValidate.error) {
                return res.status(400).json({message: updateUserValidate.error.message});
            }
            const result = await userService.updateUser(updateUserValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });

    app.put("/users/:id/change-password", async (req: Request, res: Response) => {
        try {
            const changePasswordValidate = changePasswordValidator.validate({...req.params, ...req.body});
            if (changePasswordValidate.error) {
                return res.status(400).json({message: changePasswordValidate.error.message});
            }
            const result = await userService.changePassword(changePasswordValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.put("/forget-password", async (req: Request, res: Response) => {
        try {
            const forgetPasswordValidate = forgetPasswordValidator.validate(req.body);
            if (forgetPasswordValidate.error) {
                return res.status(400).json({message: forgetPasswordValidate.error.message});
            }
            await userService.forgetPassword(forgetPasswordValidate.value);
            res.status(200).send();
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })
}