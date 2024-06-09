import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Usuario from "./usuarios";

@Entity()
export default class Carrito {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    idProd!: number;

    @Column()
    nombre!: string;

    @Column()
    cantidad!: number;

    @Column()
    precio!: number;

    @ManyToOne(() => Usuario, usuario => usuario.carritos)
    usuario!: Usuario;

    constructor(idProd: number, nombre: string, precio: number, cantidad: number, usuario: Usuario) {
        this.idProd = idProd;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.usuario = usuario;
    }
}
