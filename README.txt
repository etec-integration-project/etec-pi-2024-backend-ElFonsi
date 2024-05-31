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
