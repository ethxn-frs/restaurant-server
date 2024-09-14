import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Restaurant} from "./restaurant";

@Entity()
export class OpeningHour {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    dayOfWeek!: string;

    @Column({type: 'time'})
    openingTime!: string; // Format "HH:MM:SS"

    @Column({type: 'time'})
    closingTime!: string; // Format "HH:MM:SS"

    @ManyToOne(() => Restaurant, restaurant => restaurant.openingHours)
    restaurant!: Restaurant;

    constructor(id?: number, dayOfWeek?: string, openingTime?: string, closingTime?: string, restaurant?: Restaurant) {
        if (id) this.id = id;
        if (dayOfWeek) this.dayOfWeek = dayOfWeek;
        if (openingTime) this.openingTime = openingTime;
        if (closingTime) this.closingTime = closingTime;
        if (restaurant) this.restaurant = restaurant;
    }
}