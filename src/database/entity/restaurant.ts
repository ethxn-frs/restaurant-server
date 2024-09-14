import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {OpeningHour} from "./openingHour";
import {PaymentMethod} from "./paymentMethod";

@Entity()
export class Restaurant {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    phoneNumber!: string;

    @Column()
    address!: string;

    @Column()
    email!: string;

    @OneToMany(() => OpeningHour, openingHour => openingHour.restaurant)
    openingHours!: OpeningHour[];

    @Column()
    facebook!: string;

    @Column()
    instagram!: string;

    @Column()
    twitter!: string;

    @Column()
    snapchat!: string;

    @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.restaurant)
    paymentMethods!: PaymentMethod[];

    constructor(id?: number, name?: string, description?: string, phoneNumber?: string, address?: string, email?: string, openingHours?: OpeningHour[], facebook?: string, instagram?: string, twitter?: string, snapchat?: string, paymentMethods?: PaymentMethod[]) {
        if (id) this.id = id;
        if (name) this.name = name;
        if (description) this.description = description;
        if (phoneNumber) this.phoneNumber = phoneNumber;
        if (address) this.address = address;
        if (email) this.email = email;
        if (openingHours) this.openingHours = openingHours;
        if (facebook) this.facebook = facebook;
        if (instagram) this.instagram = instagram;
        if (twitter) this.twitter = twitter;
        if (snapchat) this.snapchat = snapchat;
        if (paymentMethods) this.paymentMethods = paymentMethods;
    }
}
