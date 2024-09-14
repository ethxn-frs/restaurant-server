import express, {Request, Response} from "express";
import {RestaurantService} from "../domain/restaurant-service";
import {
    createRestaurantValidator,
    deleteRestaurantValidator,
    updateRestaurantValidator
} from "./validator/restaurant-validator";
import {AppDataSource} from "../database/database";

const restaurantService = new RestaurantService(AppDataSource);

export const restaurantRoutes = (app: express.Express) => {

    app.get("/restaurant", async (req: Request, res: Response) => {
        try {
            const result = await restaurantService.getRestaurant();
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.post("/restaurant", async (req: Request, res: Response) => {
        try {
            const createRestaurantValidate = createRestaurantValidator.validate(req.body);
            if (createRestaurantValidate.error) {
                return res.status(400).json({message: createRestaurantValidate.error.message});
            }
            const result = await restaurantService.createRestaurant(createRestaurantValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.delete("/restaurant/:id", async (req: Request, res: Response) => {
        try {
            const idRestaurantValidate = deleteRestaurantValidator.validate(req.params);
            if (idRestaurantValidate.error) {
                return res.status(400).json({message: idRestaurantValidate.error.message});
            }
            const result = await restaurantService.deleteRestaurant(idRestaurantValidate.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.put("/restaurant/:id", async (req: Request, res: Response) => {
        try {
            const updateRestaurantValidate = updateRestaurantValidator.validate({...req.params, ...req.body});
            if (updateRestaurantValidate.error) {
                return res.status(400).json({message: updateRestaurantValidate.error.message});
            }
            const result = await restaurantService.updateRestaurant(updateRestaurantValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });
}