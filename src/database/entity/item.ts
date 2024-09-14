import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category";


@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column('decimal', {precision: 10, scale: 2})
    price!: number;

    @ManyToOne(() => Category, category => category.items)
    @JoinColumn()
    category!: Category;

    @Column()
    type!: string;

    constructor(id?: number, name?: string, description?: string, price?: number, category?: Category, type?: string) {
        if (id) this.id = id;
        if (name) this.name = name;
        if (description) this.description = description;
        if (price) this.price = price;
        if (category) this.category = category;
        if (type) this.type = type;
    }

}