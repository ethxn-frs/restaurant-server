import {CategoryService} from "../domain/category-service";
import express, {Request, Response} from "express";
import {
    createCategoryValidator,
    deleteCategoryValidator,
    getCategoryValidator,
    listCategoriesValidator, updateCategoryValidator
} from "./validator/category-validator";
import {AppDataSource} from "../database/database";

const categoryService = new CategoryService(AppDataSource);

export const categoryRoutes = (app: express.Express) => {

    app.get("/categories", async (req: Request, res: Response) => {
        try {
            const listRequestValidate = listCategoriesValidator.validate(req.query);
            if (listRequestValidate.error) {
                return res.status(400).json({message: listRequestValidate.error.message});
            }

            const result = await categoryService.getAllCategories(listRequestValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    });

    app.get("/categories/:id", async (req: Request, res: Response) => {
        try {
            const idCategoryValidate = getCategoryValidator.validate(req.params);
            if (idCategoryValidate.error) {
                return res.status(400).json({message: idCategoryValidate.error.message});
            }
            const result = await categoryService.getCategoryById(idCategoryValidate.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.post("/categories", async (req: Request, res: Response) => {
        try {
            const createCategoryValidate = createCategoryValidator.validate(req.body);
            if (createCategoryValidate.error) {
                return res.status(400).json({message: createCategoryValidate.error.message});
            }
            const result = await categoryService.createCategory(createCategoryValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.delete("/categories/:id", async (req: Request, res: Response) => {
        try {
            const idCategoryValidate = deleteCategoryValidator.validate(req.params);
            if (idCategoryValidate.error) {
                return res.status(400).json({message: idCategoryValidate.error.message});
            }
            const result = await categoryService.deleteCategory(idCategoryValidate.value.id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    })

    app.put("/categories/:id", async (req: Request, res: Response) => {
        try {
            const updateCategoryValidate = updateCategoryValidator.validate({ ...req.params, ...req.body });
            if (updateCategoryValidate.error) {
                return res.status(400).json({ message: updateCategoryValidate.error.message });
            }
            const result = await categoryService.updateCategory(updateCategoryValidate.value);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    });
}