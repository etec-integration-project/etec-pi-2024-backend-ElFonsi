import { expect } from 'chai';
import request from 'supertest';
import app from '../src/server';
import { AppDataSource } from '../src/db';


before(async () => {
  await AppDataSource.initialize();
});

after(async () => {
  await AppDataSource.destroy();
});

describe('GET /productos', () => {
  it('should return all products', async () => {
    const res = await request(app).get('/productos');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('GET /usuarios', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('POST /productos/añadirProducto', () => {
  it('should add a product', async () => {
    const newProduct = {
      nombre: 'Producto de Prueba',
      descripcion: 'Descripción del Producto de Prueba',
      precio: 100,
      cantidad: 10
    };

    const res = await request(app).post('/productos/añadirProducto').send(newProduct);
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Product added successfully');
  });
});

describe('DELETE /productos/:nombre', () => {
  it('should delete a product', async () => {
    const productName = 'Producto de Prueba';

    const res = await request(app).delete(`/productos/${productName}`);
    expect(res.status).to.equal(200);
    expect(res.text).to.equal(`Product ${productName} deleted successfully`);
  });
});

describe('POST /registrarse', () => {
  it('should register a new user', async () => {
    const newUser = {
      nombre: 'Usuario de Prueba',
      email: 'test@example.com',
      contraseña: 'password123',
      confirmPassword: 'password123'
    };

    const res = await request(app).post('/registrarse').send(newUser);
    expect(res.status).to.equal(201);
    expect(res.text).to.equal('Usuario registrado correctamente');
  });
});

describe('POST /login', () => {
  it('should log in a user', async () => {
    const loginUser = {
      email: 'test@example.com',
      contraseña: 'password123'
    };

    const res = await request(app).post('/login').send(loginUser);
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Inicio de sesión exitoso');
  });
});

describe('POST /comprar', () => {
  it('should register a cart', async () => {
    const cart = [
      { id: 1, nombre: 'Producto 1', precio: 100, cantidad: 2 },
      { id: 2, nombre: 'Producto 2', precio: 200, cantidad: 1 }
    ];

    const res = await request(app).post('/comprar').send({ cartJson: JSON.stringify(cart) });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Carrito registrado exitosamente');
  });
});