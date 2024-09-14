import express, {Request, Response} from "express";
import {loginValidator} from "./validator/user-validator";
import {AppDataSource} from "../database/database";
import {AuthService} from "../domain/auth-service";

const authService = new AuthService(AppDataSource);

export const authRoutes = (app: express.Express) => {

    app.put("/auth/login", async (req: Request, res: Response) => {
        try {
            const loginValidate = loginValidator.validate(req.body);
            if (loginValidate.error) {
                return res.status(400).json({ message: loginValidate.error.message });
            }
            const result = await authService.login(loginValidate.value);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    });

    app.get("/auth/verify-token", (req: Request, res: Response) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) return res.status(401).json({message: 'Access denied.'});

            const isValid = authService.verifyToken(token);

            if (!isValid) return res.status(403).json({message: 'Invalid or expired token.'});

            res.status(200).json({message: 'Token is valid.'});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });
}