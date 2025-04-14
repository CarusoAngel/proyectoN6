# Proyecto 6 - Catálogo de Productos con Autenticación

## Descripción

Este proyecto es una API REST desarrollada con Node.js, Express y MongoDB (usando Mongoose) que permite gestionar un catálogo de productos con autenticación y autorización de usuarios mediante JSON Web Tokens (JWT).

## Características

- Registro de usuarios con encriptación de contraseña.
- Inicio de sesión y generación de token JWT.
- Verificación de token JWT.
- Actualización de datos del usuario (nombre, correo y contraseña).
- CRUD completo para productos.
- Rutas protegidas para crear, actualizar y eliminar productos.
- Conexión a base de datos MongoDB Atlas.

## Endpoints Principales

### Usuario

- `POST /api/v1/user/register` - Registro de usuario.
- `POST /api/v1/user/login` - Inicio de sesión.
- `GET /api/v1/user/verifytoken` - Verificación de token JWT.
- `PUT /api/v1/user/update` - Actualización de usuario autenticado.

### Producto

- `POST /api/v1/product` - Crear producto (protegido).
- `GET /api/v1/product` - Obtener todos los productos.
- `GET /api/v1/product/:id` - Obtener producto por ID.
- `PUT /api/v1/product/:id` - Actualizar producto (protegido).
- `DELETE /api/v1/product/:id` - Eliminar producto (protegido).

## Requisitos del Proyecto

- Estructura de carpetas organizada: `controllers`, `routes`, `models`, `middlewares`, `config`, `utils`.
- Implementación de autenticación y autorización con JWT.
- Dos modelos: Usuario y Producto.
- Operaciones CRUD completas sobre productos.
- Protección de rutas mediante middleware `verificarToken`.
- Validación de datos y control de errores.
- Control de versiones con GitHub (commits frecuentes).
- Verificación de token por endpoint (`/verifytoken`).
- Actualización de usuario autenticado.
- Ruta base estructurada con prefijo REST `/api/v1`.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- Bcryptjs
- Dotenv
- CORS

## Instalación

1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Configurar las variables de entorno en un archivo `.env`:
   ```env
   MONGO_URI=tu_cadena_de_conexion
   JWT_SECRET=tu_clave_secreta
   PORT=3000
   ```
4. Ejecutar el servidor:
   ```bash
   node server.js
   ```

## Estado del Proyecto

✔ Estructura de carpetas completa y validada.  
✔ CRUD funcional para productos.  
✔ Registro, login y autenticación con JWT.  
✔ Middleware de verificación activo.  
✔ Rutas protegidas funcionando correctamente.  
✔ Verificación de token con `/verifytoken`.  
✔ Endpoint `/user/update` funcionando y con validación de email duplicado.

## Autor

Desarrollado por: Angel Caruso