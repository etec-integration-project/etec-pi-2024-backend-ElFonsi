
import express from "express";
import { registerProduct, addProduct, llamar_productos, eliminarProducto, login, register, llamar_usuarios, registerCart } from "../Controllers/controller";
const inicial = express.Router()
inicial.use(express.json());

inicial.get('/', (_, res) => {
    res.send('The sedulous hyena at tehe antelope!');
  });

inicial.get("/productos", llamar_productos, llamar_usuarios)
inicial.get("/usuarios", llamar_usuarios)

inicial.post('/productos/añadirProducto', addProduct);

inicial.delete('/productos/:nombre', eliminarProducto);

inicial.post('/login', login)
inicial.post('/registrarse', register)

inicial.post('/comprar', registerCart)

inicial.post('/nuevoProducto', registerProduct);

// Obtener productos cuyo precio sea mayor a 100
// inicial.get("/productos/precio_alto", productos_mas100);
/*
// Modificar un producto existente o manejar el caso cuando no existe
inicial.put("/productos/:modelo", modificar_producto);

// Eliminar un producto por su modelo o manejar el caso cuando no existe
inicial.delete("/productos/eliminar/:modelo", elim_producto);

// Obtener un producto por su país de origen
inicial.get("/productos/pais/:pais", producto_por_pais);

// Obtener un producto por su precio
inicial.get("/productos/precio/:precio", productos_por_precio);

// Crear un nuevo producto si tiene las mismas claves que los productos restantes

*/



export default inicial
  
  