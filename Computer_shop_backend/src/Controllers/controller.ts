import  { Request, Response } from "express";
import {  AppDataSource } from "../db";
import  Producto  from "../models/products";
import  Usuario  from "../models/usuarios";
import Carrito from "../models/Carrito";
// import { DeepPartial } from '
import * as bcrypt from 'bcrypt'
// import { Console } from "console";


export const llamar_productos = async(_: Request, res: Response) => {
  try {
    const productos = await AppDataSource.manager.find(Producto);
    res.json(productos);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
};
export const llamar_usuarios = async(_: Request, res: Response) => {
  try {
    const usuarios = await AppDataSource.manager.find(Usuario);
    res.json(usuarios);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
};

export const addProduct = async (req: Request, res: Response) => {
  const { nombre, descripcion, precio, cantidad } = req.body;

  try {
      await Producto.agregarProducto(nombre, descripcion, precio, cantidad, AppDataSource.manager);
      res.send('Product added successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  const { nombre } = req.params;

  try {
      const entityManager = AppDataSource.manager;
      const product = await entityManager.findOne(Producto, { where: { nombre } });

      if (!product) {
          return res.status(404).send(`Product ${nombre} not found`);
      }

      await entityManager.remove(product);
      return res.send(`Product ${nombre} deleted successfully`);
  } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
  }
};


export const register = async (req: Request, res: Response) => {
  const { nombre, email, contraseña, confirmPassword } = req.body;

  if (contraseña !== confirmPassword) {
    return res.status(400).send('Las contraseñas no coinciden');
  }

  const usuarioRepository = AppDataSource.getRepository(Usuario);

  try {
    const hashedContraseña = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = usuarioRepository.create({ nombre, email, contraseña: hashedContraseña });
    await usuarioRepository.save(nuevoUsuario);
    return res.status(201).send('Usuario registrado correctamente');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).send('Error interno del servidor');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, contraseña } = req.body;

  const usuarioRepository = AppDataSource.getRepository(Usuario);

  try {
    const usuario = await usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).send('Usuario no encontrado');
    }

    const match = await bcrypt.compare(contraseña, usuario.contraseña);

    if (match) {
      return res.status(200).send('Inicio de sesión exitoso');
      
    } else {
      return res.status(401).send('Contraseña incorrecta');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).send('Error interno del servidor');
  }
};

export const registerCart = async (req: Request, res: Response) => {
  const { cartJson, userId } = req.body;
  console.log(cartJson, "--------------------------------------------------------------------------");
  const cartObj = JSON.parse(cartJson);
  console.log(cartObj, "--------------------------------------------------------------------------");
  console.log(userId)

  try {
      const usuario = await AppDataSource.manager.findOne(Usuario, { where: { id: userId } });

      if (!usuario) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      for (const producto of cartObj) {
          const cartEntity = new Carrito(producto.id, producto.nombre, producto.precio, producto.cantidad, usuario);
          await AppDataSource.manager.save(Carrito, cartEntity);
      }

      return res.status(201).json({ message: 'Carrito registrado exitosamente' });
  } catch (err) {
      console.error('Error al registrar el carrito:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// export const elim_producto =(req: Request, res: Response) => {
//   const modelo = req.params.modelo;
// const index = Producto.findIndex((product) => product.modelo === modelo);

// if (index !== -1) {
//   Producto.splice(index, 1);
//   res.json({ message: "Producto eliminado" });
// } else {
//   res.status(404).json({ message: "Producto no encontrado" });
// }
// };

// export const productos_mas100 =(_: Request, res: Response) => {
//     const precio_alto = Producto.filter((Producto) => Producto.precio > 100);
//     res.json(precio_alto);
// };
/*
export const modificar_producto =(req: Request, res: Response) => {
    const modelo = req.params.modelo;
  const actualizarProducto: Product = req.body;
  const index = products.findIndex((product) => product.modelo === modelo);

  if (index !== -1) {
    products[index] = actualizarProducto;
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
};


export const producto_por_pais =(req: Request, res: Response) => {
    const pais = req.params.pais;
  const product = products.find((p) => p.pais === pais);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
};

export const productos_por_precio =(req: Request, res: Response) => {
    const precio = parseInt(req.params.precio);
  const product = products.find((p) => p.precio === precio);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
};

export const crear_por_clase =(req: Request, res: Response) => {
    const nuevoProducto: Product = req.body;
  const mismaskeys = products.every(
    (product) => Object.keys(product).sort().toString() === Object.keys(nuevoProducto).sort().toString()
  );

  if (mismaskeys) {
    products.push(nuevoProducto);
    res.json(nuevoProducto);
  } else {
    res.status(400).json({ message: "El nuevo producto debe tener las mismas claves que los productos existentes" });
  }
};*/




