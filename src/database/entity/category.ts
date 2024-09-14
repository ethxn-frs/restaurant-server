import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Item} from "./item";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Item, item => item.category)
    @JoinColumn()
    items!: Item[];

    constructor(id?: number, name?: string, items?: Item[]) {
        if (id) this.id = id;
        if (name) this.name = name;
        if (items) this.items = items;
    }
}
