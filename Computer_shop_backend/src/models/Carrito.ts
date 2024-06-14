import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
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

  @Column()
  userId!: number;

  @ManyToOne(() => Usuario, usuario => usuario.carritos)
  @JoinColumn({ name: "userId" })
  usuario!: Usuario;

  constructor(idProd: number, nombre: string, precio: number, cantidad: number, userId: number) {
    this.idProd = idProd;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.userId = userId;
  }
}
