import {ItemService} from "../domain/item-service";
import express, {Request, Response} from "express";
import {
    createItemValidator,
    deleteItemValidator,
    getItemValidator,
    listItemsValidator,
    updateItemValidator
} from "./validator/item-validator";
import {AppDataSource} from "../database/database";

const itemService = new ItemService(AppDataSource);

export const itemRoutes = (app: express.Express) => {

    app.get("/items", async (req: Request, res: Response) => {
        try {
            const listRequestValidate = listItemsValidator.validate(req.query);
            if (listRequestValidate.error) {
                return res.status(400).json({message: listRequestValidate.error.message});
            }

            const [items, count]= await itemService.getAllItems(listRequestValidate.value);
            res.status(200).send({items, count});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });

    app.get("/items/:id", async (req: Request, res: Response) => {
        try {
            const idItemValidate = getItemValidator.validate(req.params);
            if (idItemValidate.error) {
                return res.status(400).json({message: idItemValidate.error.message});
            }
            const result = await itemService.getItemById(idItemValidate.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.post("/items", async (req: Request, res: Response) => {
        try {
            const createItemValidate = createItemValidator.validate(req.body);
            if (createItemValidate.error) {
                return res.status(400).json({message: createItemValidate.error.message});
            }
            const result = await itemService.createItem(createItemValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.delete("/items/:id", async (req: Request, res: Response) => {
        try {
            const idItemValidate = deleteItemValidator.validate(req.params);
            if (idItemValidate.error) {
                return res.status(400).json({message: idItemValidate.error.message});
            }
            const result = await itemService.deleteItem(idItemValidate.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.put("/items/:id", async (req: Request, res: Response) => {
        try {
            const updateItemValidate = updateItemValidator.validate({...req.params, ...req.body});
            if (updateItemValidate.error) {
                return res.status(400).json({message: updateItemValidate.error.message});
            }
            const result = await itemService.updateItem(updateItemValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });
}