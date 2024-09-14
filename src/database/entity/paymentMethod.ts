import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Restaurant} from "./restaurant";

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    active!: boolean;

    @ManyToOne(() => Restaurant, restaurant => restaurant.paymentMethods)
    restaurant!: Restaurant;

    constructor(id?: number, name?: string, active?: boolean, restaurant?: Restaurant) {
        if (id) this.id = id;
        if (name) this.name = name;
        if (active) this.active = active;
        if (restaurant) this.restaurant = restaurant;
    }
}