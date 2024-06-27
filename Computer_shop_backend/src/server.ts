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

        if (product_exist.length == 0) {
            const producto1 = new Producto("Notebook Lenovo 16", "Thinkpad E16 I7-1255u | Ram 16gb | Ssd 512gb | Mx550 | W10", 1400, 1);
            const producto2 = new Producto("Pc Gamer Intel", "I3 10100f - 16gb Ram - 230gb Ssd - Gtx 1660 Super - 500w 80p White", 650, 1);
            const producto3 = new Producto("PC GAMER AMD", "RYZEN 5 8500G A620 8GB 480 SSD GABINETE KIT", 800, 1);
            const producto4 = new Producto("Mini Pc Gigabyte Brix Bsre", "Amd Ryzen 1505G -amd radeon vega 3 - RAM 8gb - 550w 80p", 450, 1);
            const producto5 = new Producto("Pc Gamer INTEL", "Amd Ryzen 1505G - amd radeon vega 3 - 230gb Ssd - Gtx 1660 Super - 500w 80p White", 500, 1);
            const producto6 = new Producto("Pc Gamer INTEL-", "I5 10400 - 8gb Ram - Asus H510M-E - 240Gb Ssd- RX560", 700, 1);
            const producto7 = new Producto("Notebook HP 15", "Intel Core i5-1135G7 | 8GB RAM | 256GB SSD | Windows 10", 850, 1);
            const producto8 = new Producto("PC Gamer Ryzen", "Ryzen 7 3700X | 16GB RAM | 512GB SSD | RTX 2060 | 650W", 1200, 1);
            const producto9 = new Producto("PC Oficina Dell", "Intel Core i3-10100 | 8GB RAM | 1TB HDD | Windows 10 Pro", 400, 1);
            const producto10 = new Producto("Mini PC Zotac ZBOX", "Intel Core i7-10750H | 16GB RAM | 512GB SSD | UHD Graphics", 950, 1);
            const producto11 = new Producto("PC Gamer ASUS", "Ryzen 5 5600X | 16GB RAM | 1TB SSD | GTX 1660 Ti | 600W", 1100, 1);
            const producto12 = new Producto("Notebook Acer Aspire 5", "Intel Core i7-1165G7 | 16GB RAM | 512GB SSD | Windows 10", 1000, 1);
            const producto13 = new Producto("PC Gaming HP Omen", "Intel Core i7-10700K | 16GB RAM | 1TB SSD | RTX 2070 | 750W", 1400, 1);
            const producto14 = new Producto("All-in-One Lenovo", "Intel Core i5-10400T | 8GB RAM | 256GB SSD | 23.8\" FHD", 750, 1);
            const producto15 = new Producto("PC Gamer MSI Trident", "Intel Core i5-10500 | 16GB RAM | 512GB SSD | GTX 1660", 1050, 1);
            const producto16 = new Producto("Notebook Dell XPS 13", "Intel Core i7-1185G7 | 16GB RAM | 1TB SSD | Windows 10", 1500, 1);
            const producto17 = new Producto("PC Workstation", "Intel Xeon W-2223 | 32GB RAM | 1TB SSD | Quadro P1000", 2000, 1);
            const producto18 = new Producto("Mini PC Intel NUC", "Intel Core i5-8259U | 8GB RAM | 256GB SSD | Iris Plus 655", 600, 1);
            const producto19 = new Producto("PC Gaming Alienware", "Intel Core i9-10900KF | 32GB RAM | 1TB SSD | RTX 3080 | 1000W", 2500, 1);
            const producto20 = new Producto("Notebook Lenovo Yoga", "Intel Core i7-1160G7 | 16GB RAM | 512GB SSD | Windows 10", 1300, 1);
            const producto21 = new Producto("PC Gamer CyberPowerPC", "AMD Ryzen 9 3900X | 32GB RAM | 1TB SSD | RTX 3070 | 850W", 2200, 1);
            const producto22 = new Producto("Notebook ASUS ROG", "AMD Ryzen 7 5800H | 16GB RAM | 1TB SSD | RTX 3060", 1700, 1);
            const producto23 = new Producto("PC Gaming Lenovo Legion", "Intel Core i7-10700 | 16GB RAM | 512GB SSD | RTX 2060 | 650W", 1300, 1);
            const producto24 = new Producto("Notebook HP Spectre x360", "Intel Core i7-1165G7 | 16GB RAM | 1TB SSD | Windows 10", 1600, 1);
            const producto25 = new Producto("PC Oficina HP ProDesk", "Intel Core i5-10500 | 8GB RAM | 512GB SSD | Windows 10 Pro", 800, 1);
            const producto26 = new Producto("Mini PC ASUS PN50", "AMD Ryzen 5 4500U | 16GB RAM | 512GB SSD | Vega 6", 700, 1);
        
            AppDataSource.manager.save([
                producto1, producto2, producto3, producto4, producto5, producto6,
                producto7, producto8, producto9, producto10, producto11, producto12,
                producto13, producto14, producto15, producto16, producto17, producto18,
                producto19, producto20, producto21, producto22, producto23, producto24,
                producto25, producto26
            ]);
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