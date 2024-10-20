Para esta solución, se utiliza MySQL en un contenedor de Docker. Si no tienes MySQL en un contenedor, tendrás que buscar otra solución sin el uso de network, ya que esta configuración permite la comunicación entre contenedores.

1. Crear y configurar MySQL en un contenedor de Docker
En caso de que no tengas un contenedor de MySQL creado, debes ejecutar los siguientes comandos para crear el contenedor con MySQL:

docker run --name nest-admin --network backend -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=nest_admin mysql:5.7

Esto creará un contenedor llamado nest-admin que estará conectado a la red backend y expuesto en el puerto 3306.

2. Crear la base de datos nest_admin

Crea la base de datos y la tabla:

USE nest_admin;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

3. Configuración del Docker Admin-Service
Si estás usando MySQL instalado localmente:
En el caso de que tengas MySQL instalado localmente, deberás usar la siguiente ruta de conexión en el archivo app.module.ts y en el docker-compose.yml para conectarte correctamente:

TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest_admin',
  autoLoadEntities: true,
  synchronize: true,
}),

Si estás usando MySQL en un contenedor de Docker:
Si MySQL está corriendo en un contenedor, deberás asegurarte de que el archivo app.module.ts y el docker-compose.yml usen el nombre del contenedor de MySQL en lugar de localhost:

TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'nest-admin',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest_admin',
  autoLoadEntities: true,
  synchronize: true,
}),

4. Crear la red de Docker
Si no tienes una red creada, ejecuta el siguiente comando para crear la red de Docker:


docker network create backend

5. Conectar el contenedor de MySQL a la red
Conecta el contenedor de MySQL a la red backend:

docker network connect backend nest-admin

6. Levantar los contenedores del servicio Admin
Finalmente, una vez que todo esté configurado y el contenedor de MySQL esté corriendo, levanta el contenedor del servicio Admin utilizando Docker Compose:

bash
Copiar código
docker-compose up --build
