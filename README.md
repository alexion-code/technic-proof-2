# technic-proof-flat101

Este proyecto ha sido creado con motivo de la realización de una prueba técnica de flat101.

********************************************************
 DETALLES DE LA TECNOLOGÍA Y ARQUITECTURAS EMPLEADAS: 
********************************************************

Se utiliza para crear el proyecto NPM v7.24.0, NodeJS v16.10.0 y React v18.1.0, con las versiones más actualizadas de Redux, Sass y React-Router (v6).

Se utiliza Docker Compose como contenedor para ejecutar la API, la Base de Datos y Redis.

La API REST la hemos desarrollado con el framework NESTJS, basado en NodeJS y Express.

La Base de Datos utilizada es MySQL.

También utilizamos REDIS para las transacciones de Datos, que es un rápido almacén de datos clave-valor en memoria de código abierto.

*********************************
 INSTRUCCIONES DE INSTALACIÓN: 
*********************************

1.-Clone el repositorio en local con GIT.

2.-Una vez clonado el repositorio, necesitará tener instalado docker desktop.

3.-Realice un git pull de la rama master para traer la rama a su local.

4.-Abra un CMD o terminal en VSCode y entre en la carpeta "nest-backend" del proyecto, ejecute "npm i", y a continuación ejecute "docker-compose up" para levantar el contenedor con los servicios y la BBDD.

5.-Abra otro CMD o terminal en VSCode y entre en la carpeta "react-admin" del proyecto y ejecute "npm i" y luego "npm run start".

6.-El siguiente paso es registrarse en la aplicación en "Register" que aparece en la barra de navegación.

7.-Logarse con el usuario registrado a continuación.

8.-Entrar en el panel de admin, pulsando "Admin" en la barra de navegación.

9.-En el panel de administración pulsamos "products" y una vez se muestre la pantalla de productos, pulsar "Add" para añadir los productos. Rellenar los campos del nuevo producto y para el campo "image" puede obtener las imágenes de los productos abriendo la dirección "https://loremflickr.com/280/240/business" en otra pestaña y automaticamente se le devolverá una dirección de imagen que podrá pegar en el campo "image" del producto.