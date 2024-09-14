import {DataSource, DataSourceOptions} from 'typeorm';
import {Category} from "./entity/category";
import {Item} from "./entity/item";
import {OpeningHour} from "./entity/openingHour";
import {Restaurant} from "./entity/restaurant";
import * as dotenv from 'dotenv';
import {User} from "./entity/user";
import {PaymentMethod} from "./entity/paymentMethod";

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    synchronize: true,
    entities: [
        Category,
        Item,
        OpeningHour,
        Restaurant,
        User,
        PaymentMethod
    ],
    migrations: ['./src/migrations/*.ts'],
};

export const AppDataSource = new DataSource(config);
