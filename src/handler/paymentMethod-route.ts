import express, {Request, Response} from "express";
import {AppDataSource} from "../database/database";
import {PaymentMethodService} from "../domain/paymentMethod-service";
import {
    createPaymentMethodValidator,
    deletePaymentMethodValidator,
    getPaymentMethodValidator,
    listPaymentMethodsValidator,
    updatePaymentMethodValidator
} from "./validator/paymentMethod-validator";

const paymentMethodService = new PaymentMethodService(AppDataSource);

export const paymentMethodRoutes = (app: express.Express) => {

    app.get("/paymentMethods", async (req: Request, res: Response) => {
        try {
            const listRequestValidate = listPaymentMethodsValidator.validate(req.query);
            if (listRequestValidate.error) {
                return res.status(400).json({message: listRequestValidate.error.message});
            }

            const result = await paymentMethodService.getAllPaymentMethods(listRequestValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });

    app.get("/paymentMethods/:id", async (req: Request, res: Response) => {
        try {
            const idPaymentMethodService = getPaymentMethodValidator.validate(req.params);
            if (idPaymentMethodService.error) {
                return res.status(400).json({message: idPaymentMethodService.error.message});
            }
            const result = await paymentMethodService.getPaymentMethodsById(idPaymentMethodService.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.post("/paymentMethods", async (req: Request, res: Response) => {
        try {
            const createPaymentMethodValidate = createPaymentMethodValidator.validate(req.body);
            if (createPaymentMethodValidate.error) {
                return res.status(400).json({message: createPaymentMethodValidate.error.message});
            }
            const result = await paymentMethodService.createPaymentMethod(createPaymentMethodValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.delete("/paymentMethods/:id", async (req: Request, res: Response) => {
        try {
            const idPaymentMethodService = deletePaymentMethodValidator.validate(req.params);
            if (idPaymentMethodService.error) {
                return res.status(400).json({message: idPaymentMethodService.error.message});
            }
            const result = await paymentMethodService.deletePaymentMethod(idPaymentMethodService.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.put("/paymentMethods/:id", async (req: Request, res: Response) => {
        try {
            const updatePaymentMethodValidate = updatePaymentMethodValidator.validate({...req.params, ...req.body});
            if (updatePaymentMethodValidate.error) {
                return res.status(400).json({message: updatePaymentMethodValidate.error.message});
            }
            const result = await paymentMethodService.updatePaymentMethod(updatePaymentMethodValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });
}