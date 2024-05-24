import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"
// import Producto from "./products";
@Entity()
export default class Carrito {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    idProd!: number

    @Column()
    nombre!:string

    @Column()
    cantidad!: number

    @Column()
    precio!: number

    constructor(idProd:number, nombre:string, precio:number, cantidad:number) {
        this.idProd= idProd;
        this.nombre= nombre;
        this.precio= precio;
        this.cantidad=cantidad;
    }
}