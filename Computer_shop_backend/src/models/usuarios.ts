import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Carrito from "./Carrito";

@Entity()
export default class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    contraseña!: string;

    @OneToMany(() => Carrito, carrito => carrito.usuario)
    carritos!: Carrito[];

    constructor(nombre: string, email: string, contraseña: string) {
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
    }
}
