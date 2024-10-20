
# Dockerización del Microservicio Admin con MySQL

Este repositorio contiene el código del microservicio **Admin**, desarrollado en **Node.js** y **TypeORM**, utilizando **MySQL** como base de datos. A continuación, encontrarás las instrucciones paso a paso para configurar y levantar el entorno utilizando Docker.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu máquina antes de comenzar:
- **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Normalmente se instala junto con Docker

## Instrucciones Paso a Paso

### 1. Clonar el Repositorio

Clona el repositorio en tu máquina local utilizando Git.

```bash
git clone <url_del_repositorio>
```

### 2. Crear y Configurar MySQL en un Contenedor de Docker

Si no tienes un contenedor de MySQL corriendo, ejecuta el siguiente comando para crear un contenedor de **MySQL 5.7**:

```bash
docker run --name nest-admin --network backend -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=nest_admin mysql:5.7
```

Este comando crea un contenedor llamado `nest-admin` que:
- Corre en la red de Docker llamada `backend`.
- Expone el puerto `3306` para conexiones MySQL.
- Tiene la base de datos `nest_admin` creada automáticamente y configurada con la contraseña `root`.

### 3. Crear la Base de Datos y la Tabla `products`

Si la tabla `products` no se creó automáticamente, sigue estos pasos:

1. Conéctate al contenedor de MySQL:

   ```bash
   docker exec -it nest-admin mysql -uroot -proot
   ```

2. Ejecuta los siguientes comandos SQL para crear la tabla `products` en la base de datos `nest_admin`:

   ```sql
   USE nest_admin;

   CREATE TABLE IF NOT EXISTS products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10, 2) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### 4. Crear la Red de Docker

Si no tienes una red de Docker creada, utiliza el siguiente comando para crear una red llamada `backend`, que permitirá la comunicación entre los contenedores:

```bash
docker network create backend
```

### 5. Conectar el Contenedor de MySQL a la Red

Conecta el contenedor de MySQL (`nest-admin`) a la red `backend`:

```bash
docker network connect backend nest-admin
```

### 6. Configuración del Archivo `app.module.ts`

#### **Si estás usando MySQL en Docker**:

En el archivo `app.module.ts`, asegúrate de que la conexión a MySQL esté configurada correctamente usando el nombre del contenedor `nest-admin`:

```typescript
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
```

#### **Si estás usando MySQL Localmente**:

Si tienes MySQL instalado localmente, asegúrate de que la conexión en `app.module.ts` esté configurada así:

```typescript
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
```

### 7. Levantar los Contenedores con Docker Compose

Finalmente, una vez que todo esté configurado correctamente, puedes levantar el microservicio **Admin** utilizando Docker Compose:

```bash
docker-compose up --build
```

Este comando compilará y levantará el microservicio **Admin** en un contenedor, asegurando que esté conectado correctamente a la base de datos MySQL.

## Comandos Adicionales

- **Ver los logs de los contenedores**:
  ```bash
  docker-compose logs -f
  ```

- **Parar y eliminar los contenedores**:
  ```bash
  docker-compose down
  ```
