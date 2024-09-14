import express from "express";
import {AppDataSource} from "./database/database";
import cors from 'cors';
import {categoryRoutes} from "./handler/category-route";
import {itemRoutes} from "./handler/item-route";
import {openingHourRoutes} from "./handler/openingHour-route";
import {restaurantRoutes} from "./handler/restaurant-route";
import * as dotenv from "dotenv";
import {userRoutes} from "./handler/user-route";
import {authRoutes} from "./handler/auth-route";
import {paymentMethodRoutes} from "./handler/paymentMethod-route";

dotenv.config();

const validateEnvVariables = () => {
    const requiredEnvVars = [
        'DB_HOST',
        'DB_PORT',
        'DB_USERNAME',
        'DB_PASSWORD',
        'DB_NAME',
        'APP_PORT',
        'EMAIL_TRANSPORTER',
        'PASSWORD_TRANSPORTER',
        'JWT_SECRET'
    ];

    const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
};

const main = async () => {

    try {
        validateEnvVariables();
        console.log("All required environment variables are present.");
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }

    const app = express();
    const port = process.env.APP_PORT;

    try {
        await AppDataSource.initialize();
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Cannot connect to the database", error);
        process.exit(1);
    }

    app.use(cors());
    app.use(express.json());

    try {
        authRoutes(app);
        categoryRoutes(app);
        itemRoutes(app);
        openingHourRoutes(app);
        paymentMethodRoutes(app);
        restaurantRoutes(app);
        userRoutes(app);
        console.log("Routes are set up successfully");
    } catch (error) {
        console.error("Error setting up routes:", error);
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

main().catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit(1);
});
