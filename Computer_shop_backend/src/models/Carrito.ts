import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"
// import Producto from "./products";
@Entity()
export default class Carrito {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    carro: string;

    constructor(carro: string ) {
        this.carro = carro;
    }
}