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




// AppDataSource.initialize()
//     .then(async() => {
//         console.log("DataBase Inicilizated")
//         const producto1 = new Producto("Notebook Lenovo 15,6","Thinkpad E15 I7-1255u | Ram 16gb | Ssd 512gb | Mx550 | W10", 1300)
//         const producto2 = new Producto("Outlet Pc Gamer Intel ","I3 10100f - 16gb Ram - 240gb Ssd - Gtx 1660 Super - 500w 80p White", 650)
//         AppDataSource.manager.save([producto1,producto2])
//     })
//     .catch((error)=> {
//         console.log(error)
//     })


// export interface Product {
//     modelo: string;
//     pais: string;
//     precio: number;

//   }
  
//   export const products: Product[] = [
//     { modelo: "Producto1", pais: "País1", precio: 120 },
//     { modelo: "Producto2", pais: "País2", precio: 90 },
//     { modelo: "Producto3", pais: "País3", precio: 200 },

//   ];
