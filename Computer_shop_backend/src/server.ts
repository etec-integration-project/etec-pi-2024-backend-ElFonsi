import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { AppDataSource } from './db';
import userRoutes from './router/routes'
import Producto from './models/products';
import  Usuario  from "./models/usuarios";

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(userRoutes)

async function main() {
    try{

        await AppDataSource.initialize();
        console.log('Database connected')
        app.listen(8080);
        console.log('Server is listening on port', 8080);

        const validation_product= AppDataSource.manager.getRepository(Producto)
        const product_exist= await validation_product.find()
        const validation_usuario= AppDataSource.manager.getRepository(Usuario)
        const usuario_exist= await validation_usuario.find()

        if (product_exist.length == 0){
            const producto1= new Producto("Notebook Lenovo 16","Thinkpad E16 I7-1255u | Ram 16gb | Ssd 512gb | Mx550 | W10", 1400, 1)
            const producto2 = new Producto("Outlet Pc Gamer Intel","I3 10100f - 16gb Ram - 230gb Ssd - Gtx 1660 Super - 500w 80p White", 650, 1)
            AppDataSource.manager.save([producto1, producto2])
             console.log(product_exist)
        }

        if (usuario_exist.length == 0){
            const usuario1= new Usuario("Jero","jero@gmail.com","contraseña1")
            const usuario2 = new Usuario("Juan","juan@gmail.com","contraseña2")
            AppDataSource.manager.save([usuario1, usuario2])
            console.log(usuario_exist)
        }
    }
    catch(error){
        console.log(error);
    } 
}
main();

export default app;