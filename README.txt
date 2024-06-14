-------------------------TUTORIAL PARA INICIAR EL PROYECTO------ALFONSO MAGALLANES------------------

1_ Clonaremos el proyecto de git hub con el siguiente commando

git clone https://github.com/etec-integration-project/etec-pi-2024-backend-ElFonsi.git // o // git@github.com:etec-integration-project/etec-pi-2024-backend-ElFonsi.git

2_ Para levantar la aplicacion primer nos dirigiremos a la terminal y nos colocaremos en la carpeta donde se 
encuentra nuestro proyecto(el proyecto lo encontraremos en la carpeta de donde lo clonamos)

cd [direccion de la carpeta del proyecto]

3_Estando posicionados sobre la carpeta etec-pi-2024-backend-ElFonsi vamos a clonar el frontend con el siguiente commando

git clone https://github.com/etec-integration-project/etec-pi-2024-frontend-ElFonsi.git // o // git@github.com:etec-integration-project/etec-pi-2024-frontend-ElFonsi.git

4_ Ahora ejecutaremos el commando para levantar la aplicacion

docker compose up --build -d

4- Listo, si la aplicacion se levanto como corresponde nos dirigiremos al buscador y entraremos a esta pagina http://localhost:8080/productos , http://localhost:3000/ , si podemos apreciar los productos de la base de datos y podemos ver el inicio de la pagina es porque la base de datos esta activa y el frontend levantado.

-------------------------------------------------------SPRINT 2 DOCUMENTACIÓN------------------------

En este sprint me enfoque en arreglar la tabla Carrito ya que esta solo mostraba un string con la compra 
realizada y queria modificar eso. Tambien logre levantar el frontend junto con el backend con docker compose

Primero modifique en el front-end este codigo para que recibiera mas parametros (nombre, cantidad, precio)

const CarroFiltrado = Object.values(carrito).map(({ id, nombre, cantidad, precio }) => ({ id, nombre, cantidad, precio }));

Luego coloque mas columnas a la tabla Carrito en el backend

@Column()
    idProd!: number

    @Column()
    nombre!:string

    @Column()
    cantidad!: number

    @Column()
    precio!: number

Y en el controller modifique la funcion registerCart y la variable cartJson la converti en un cartJson

const cartObj= JSON.parse(cartJson);

Esto lo hice para poder colocar todas estas variables del cartJson en una nueva cartEntity

 for (const producto of cartObj) {
      const cartEntity = new Carrito(producto.id, producto.nombre, producto.precio, producto.cantidad);
      await AppDataSource.manager.save(Carrito, cartEntity);
    }

Con esto ya lograria que la tabla carrito este muestre correctamente los objetivos que has sido comprados.

Para levantar el frontend con docker compose primero cree un nuevo Dockerfile


FROM node:latest


WORKDIR /app


COPY package*.json ./


RUN npm install

COPY . .


EXPOSE 3000

CMD ["npm","start"]

Y despues en el backend agregue el frontend en el docker-compose.yml

frontend:
    build: ./etec-pi-2024-frontend-ElFonsi
    ports:
      - 3000:3000
    restart: always

Ya con esto he podido levantar el frontend correctamente.

-------------------------------------------------------SPRINT 2 TDD------------------------

Utilizando la libreria Mocha y Chai he estado tratando de testear todas las funcionalidades de mi proyecto programado en Typescript.

Para eso cree un archivo controller.test.ts y agregue funciones que se encargan de probar los endpoints de mi proyecto, el problema 
que tengo es que al intentar correr el archivo no me reconoce la extension.ts y esto ha logrado impedirme continuar con los testeos.

He estado investigando como corregir este error pero no he sido exitoso, espero lograr corregir esto lo antes posible.

-------------------------------------------------------SPRINT 3 DOCUMENTACIÓN------------------------

En este sprint me enfoque en mejorar aun mas la relacion entre la tabla Usuario y la tabla de Carrito donde se encuentran las
compras. Para esto entable una relacion OneToMany(Usuario) y ManyToOne(Carrito) con el fin de que cuando se realize una compra,
en la tabla del carrito se muestre el UserId del usuario que realizo la compra.

Para lograr esto utilize el 'localStorage' ques es una propiedad de la Window que permite acceder a un objeto Storage de la sesión 
de almacenamiento. Puede ser utilizado para almacenar datos de manera que persistan entre las sesiones del navegador. 

Aca demuestro uno de los casos de como lo use: 

const response = await axios.post('http://localhost:8080/registrarse', usuario);
    localStorage.setItem('userId', response.data.userId);

-------------

const response = await axios.post('http://localhost:8080/login', usuario);
    localStorage.setItem('userId', response.data.userId);

-----------

const handleCarrito = async () => {
  const userId = localStorage.getItem('userId');

  if (cartJson !== "[]") {
    try {
      await axios.post('http://localhost:8080/comprar', { cartJson, userId });
      window.alert('Articulos comprados exitosamente');
      vaciarCarrito();
    } catch (err) {
      alert('Error al realizar la compra');
      console.log("Error al registrar carrito: ", err);
    }
  } else {
    alert('Seleccionar articulos');
  }
};

----------------

En el controller ajuste algunas funciones para poder implementar esta nueva funcionalidad

export const register = async (req: Request, res: Response) => {
//////
//
try {
    const hashedContraseña = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = usuarioRepository.create({ nombre, email, contraseña: hashedContraseña });
    await usuarioRepository.save(nuevoUsuario);

    return res.status(201).json({ userId: nuevoUsuario.id }); 

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).send('Error interno del servidor');
  }

////////
///
----------------

export const login = async (req: Request, res: Response) => {
//////
//
if (match) {
      return res.status(200).json({ userId: usuario.id }); 
    } else {
      return res.status(401).send('Contraseña incorrecta');
//////
//

Asi es como quedo el nuevo registerCart implementa la nueva funcion:

export const registerCart = async (req: Request, res: Response) => {
  const { cartJson, userId } = req.body;
  console.log(cartJson, "--------------------------------------------------------------------------");
  const cartObj = JSON.parse(cartJson);
  console.log(cartObj, "--------------------------------------------------------------------------");
  console.log(userId)
  
  if (!userId || !cartJson) {
    return res.status(400).json({ error: 'Falta información necesaria' });
  }

  try {
    const usuario = await AppDataSource.manager.findOne(Usuario, { where: { id: userId } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const cartObj = JSON.parse(cartJson);

    for (const producto of cartObj) {
      const cartEntity = new Carrito(producto.id, producto.nombre, producto.precio, producto.cantidad, userId);
      await AppDataSource.manager.save(Carrito, cartEntity);
    }

    return res.status(201).json({ message: 'Carrito registrado exitosamente' });
  } catch (err) {
    console.error('Error al registrar el carrito:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

-------------RESULTADO EN TABLA----
id  idProd  nombre                cantidad  precio     UserId
1	1	    Notebook Lenovo 16	    2	     1400    	3
2	2	    Outlet Pc Gamer Intel	1	     650	    3


