import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column({nullable: true})
    phoneNumber!: string;

    @Column()
    password!: string;

    @Column()
    alreadyLoggedIn!: boolean;

    constructor(id?: number, firstName?: string, lastName?: string, email?: string, phoneNumber?: string, password?: string, alreadyLoggedIn?: boolean) {
        if (id) this.id = id;
        if (firstName) this.firstName = firstName;
        if (lastName) this.lastName = lastName;
        if (email) this.email = email;
        if (password) this.email = password;
        if (phoneNumber) this.phoneNumber = phoneNumber;
        if (alreadyLoggedIn) this.alreadyLoggedIn = alreadyLoggedIn;
    }
}