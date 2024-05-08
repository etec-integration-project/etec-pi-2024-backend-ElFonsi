import {Entity, Column, PrimaryGeneratedColumn, EntityManager} from "typeorm"
// import Carrito from "./Carrito"

@Entity()
export default class Producto{
    @PrimaryGeneratedColumn()
    id!: number 
    @Column()
    nombre!:string
    @Column()
    descripcion!: string  
    @Column()
    precio!: number
    @Column()
    cantidad!: number

    constructor(nombre:string, descripcion:string, precio:number, cantidad:number){
        this.nombre= nombre;
        this.descripcion= descripcion;
        this.precio= precio;
        this.cantidad=cantidad;
    }


    static async eliminarPorNombre(nombre: string, entityManager: EntityManager): Promise<void> {
        const product = await entityManager.findOne(Producto, { where: { nombre } });
        if (product) {
            await entityManager.remove(product);
        }
    }

    static async agregarProducto(nombre: string, descripcion: string, precio: number,cantidad:number, entityManager: EntityManager): Promise<void> {
        const newProduct = new Producto(nombre, descripcion, precio, cantidad);
        newProduct.nombre = nombre;
        newProduct.descripcion = descripcion;
        newProduct.precio = precio;
        newProduct.cantidad= cantidad;

        await entityManager.save(newProduct);
    }
}


