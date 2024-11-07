import {DataSource} from "typeorm"
import Producto from "./models/products"
import  Usuario  from "./models/usuarios";
import Carrito from "./models/Carrito";
import {config} from "dotenv"
config()

export const AppDataSource= new DataSource({
    type: "mysql",
    host:process.env.MYSQLDB_HOST,
    port:+(process.env.MYSQLDB_DOCKER_PORT!),
    username:process.env.MYSQLDB_USERNAME,
    password:process.env.MYSQLDB_PASSWORD,
    database:process.env.MYSQLDB_DATABASE,
    synchronize:true,
    logging:true,
    entities:[Producto, Usuario, Carrito],
    subscribers:[],
    migrations:[]
})



