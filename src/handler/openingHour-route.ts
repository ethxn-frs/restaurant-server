import express, {Request, Response} from "express";
import {OpeningHourService} from "../domain/openingHour-service";
import {
    createOpeningHourValidator,
    deleteOpeningHourValidator,
    getOpeningHourValidator,
    listOpeningHoursValidator,
    updateOpeningHourValidator
} from "./validator/openingHour-validator";
import {AppDataSource} from "../database/database";

const openingHourService = new OpeningHourService(AppDataSource);

export const openingHourRoutes = (app: express.Express) => {

    app.get("/openingHours", async (req: Request, res: Response) => {
        try {
            const listRequestValidate = listOpeningHoursValidator.validate(req.query);
            if (listRequestValidate.error) {
                return res.status(400).json({message: listRequestValidate.error.message});
            }

            const result = await openingHourService.getAllOpeningHours(listRequestValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });

    app.get("/openingHours/:id", async (req: Request, res: Response) => {
        try {
            const idOpeningHourValidate = getOpeningHourValidator.validate(req.params);
            if (idOpeningHourValidate.error) {
                return res.status(400).json({message: idOpeningHourValidate.error.message});
            }
            const result = await openingHourService.getOpeningHourById(idOpeningHourValidate.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.post("/openingHours", async (req: Request, res: Response) => {
        try {
            const createOpeningHourValidate = createOpeningHourValidator.validate(req.body);
            if (createOpeningHourValidate.error) {
                return res.status(400).json({message: createOpeningHourValidate.error.message});
            }
            const result = await openingHourService.createOpeningHour(createOpeningHourValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.delete("/openingHours/:id", async (req: Request, res: Response) => {
        try {
            const idOpeningHourValidate = deleteOpeningHourValidator.validate(req.params);
            if (idOpeningHourValidate.error) {
                return res.status(400).json({message: idOpeningHourValidate.error.message});
            }
            const result = await openingHourService.deleteOpeningHour(idOpeningHourValidate.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.put("/openingHours/:id", async (req: Request, res: Response) => {
        try {
            const updateOpeningHourValidate = updateOpeningHourValidator.validate({...req.params, ...req.body});
            if (updateOpeningHourValidate.error) {
                return res.status(400).json({message: updateOpeningHourValidate.error.message});
            }
            const result = await openingHourService.updateOpeningHour(updateOpeningHourValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });
}