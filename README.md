# technic-proof-flat101

Este proyecto ha sido creado con motivo de la realización de una prueba técnica de flat101.

********************************************************
 PARTE 1 DE LA PRUEBA: CREAR APLICACIÓN EN REACT Y API
********************************************************


********************************************************
 DETALLES DE LA TECNOLOGÍA Y ARQUITECTURAS EMPLEADAS: 
********************************************************

Se utiliza para crear el proyecto NPM v7.24.0, NodeJS v16.10.0 y React v18.1.0, con las versiones más actualizadas de Redux, Sass y React-Router (v6).

Se utilizan las librerías de estilos MaterialUI y Bootstrap para comprobar el conocimiento de las mismas.

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

9.-En el panel de administración pulsamos "products" y una vez se muestre la pantalla de productos, pulsar "Add" para añadir los productos. Rellenar todos los campos y hacer click en guardar. El campo "image" se ha desactivado para que por defecto introduzca una imagen estandar.

10.-Los productos se podrán visualizar al completo desde la Home, pulsando cualquiera de los enlaces superiores izquierdos del panel de administración. Para la Home no es necesario estar logado.


********************************************************
 PARTE 2 DE LA PRUEBA: MAQUETACIÓN DE PÁGINA WEB
********************************************************

La página HTML con el código y demás archivos necesarios están en un zip compilado sobre la raíz del proyecto o también lo puede ejecutar y visualizar directamente desde la carpeta "maquetacion".