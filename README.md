# UpTask Backend 📋

API REST para la gestión de proyectos y tareas desarrollada con Node.js, Express, TypeScript y MongoDB.

## 🚀 Características

- **Autenticación completa**: Registro, login, confirmación de cuenta y recuperación de contraseña
- **Gestión de proyectos**: CRUD completo para proyectos
- **Gestión de tareas**: Crear, editar, eliminar y cambiar estados de tareas
- **Sistema de equipos**: Agregar y remover miembros de proyectos
- **Sistema de notas**: Comentarios en tareas con información del autor
- **Validaciones robustas**: Middleware de validación en todas las rutas
- **Autenticación JWT**: Tokens seguros para manejo de sesiones
- **Envío de emails**: Notificaciones por correo electrónico
- **CORS configurado**: Listo para frontend

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Superset tipado de JavaScript
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - JSON Web Tokens para autenticación
- **Bcrypt** - Encriptación de contraseñas
- **Nodemailer** - Envío de correos electrónicos
- **Express Validator** - Validación de datos
- **CORS** - Cross-Origin Resource Sharing
- **Colors** - Colores en consola
- **Morgan** - Logger HTTP

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB (local o en la nube)
- npm o yarn

## ⚙️ Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd uptask-backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:
```env
# Base de datos
DATABASE_URL=mongodb://localhost:27017/uptask

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Configuración SMTP para emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_password_de_aplicacion

# Puerto del servidor
PORT=4000
```

4. Inicia el servidor:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 🗂️ Estructura del Proyecto

```
src/
├── config/           # Configuraciones
│   ├── cors.ts      # Configuración CORS
│   ├── db.ts        # Conexión a MongoDB
│   └── nodemailer.ts # Configuración de emails
├── controllers/      # Controladores
│   ├── AuthController.ts
│   ├── ProjectController.ts
│   ├── TaskController.ts
│   ├── TeamController.ts
│   └── NoteController.ts
├── middleware/       # Middlewares
│   ├── auth.ts      # Autenticación
│   ├── project.ts   # Validación de proyectos
│   ├── task.ts      # Validación de tareas
│   └── validation.ts # Manejo de errores
├── models/          # Modelos de datos
│   ├── User.ts
│   ├── Project.ts
│   ├── Task.ts
│   ├── Token.ts
│   └── Note.ts
├── routes/          # Rutas
│   ├── authRoutes.ts
│   └── projectRoutes.ts
├── utils/           # Utilidades
│   ├── auth.ts      # Hash de contraseñas
│   ├── jwt.ts       # Generación de tokens
│   └── token.ts     # Tokens de verificación
├── emails/          # Templates de emails
│   └── AuthEmail.ts
├── server.ts        # Configuración del servidor
└── index.ts         # Punto de entrada
```

## 🔐 API Endpoints

### Autenticación (`/api/auth`)
- `POST /create-account` - Crear cuenta de usuario
- `POST /confirm-account` - Confirmar cuenta con token
- `POST /login` - Iniciar sesión
- `POST /forgot-password` - Solicitar recuperación de contraseña
- `POST /validate-token` - Validar token de recuperación
- `POST /update-password/:token` - Actualizar contraseña con token
- `GET /user` - Obtener perfil del usuario autenticado
- `PUT /profile` - Actualizar perfil
- `POST /update-password` - Cambiar contraseña actual
- `POST /check-password` - Verificar contraseña actual

### Proyectos (`/api/projects`)
- `POST /` - Crear proyecto
- `GET /` - Obtener todos los proyectos del usuario
- `GET /:id` - Obtener proyecto por ID
- `PUT /:projectId` - Actualizar proyecto
- `DELETE /:projectId` - Eliminar proyecto

### Tareas (`/api/projects/:projectId/tasks`)
- `POST /` - Crear tarea
- `GET /` - Obtener tareas del proyecto
- `GET /:taskId` - Obtener tarea por ID
- `PUT /:taskId` - Actualizar tarea
- `DELETE /:taskId` - Eliminar tarea
- `POST /:taskId/status` - Actualizar estado de tarea

### Equipos (`/api/projects/:projectId/team`)
- `POST /find` - Buscar miembro por email
- `GET /` - Obtener equipo del proyecto
- `POST /` - Agregar miembro al equipo
- `DELETE /:userId` - Remover miembro del equipo

### Notas (`/api/projects/:projectId/tasks/:taskId/notes`)
- `POST /` - Crear nota
- `GET /` - Obtener notas de la tarea
- `DELETE /:noteId` - Eliminar nota

## 🔑 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Incluye el token en el header `Authorization`:

```
Authorization: Bearer <tu-jwt-token>
```

## 📧 Sistema de Emails

El sistema envía emails automáticamente para:
- Confirmación de cuenta nueva
- Recuperación de contraseña
- Tokens de verificación

## 🎯 Estados de Tareas

Las tareas pueden tener los siguientes estados:
- `pending` - Pendiente
- `onHold` - En espera
- `inProgress` - En progreso
- `underReview` - En revisión
- `completed` - Completada

## 🛡️ Seguridad

- Contraseñas hasheadas con bcrypt
- Validación de datos en todas las rutas
- Middleware de autenticación
- CORS configurado
- Tokens de verificación con expiración

## 🚀 Despliegue

### Variables de entorno para producción:
Asegúrate de configurar todas las variables de entorno necesarias en tu plataforma de despliegue.

### Comando de producción:
```bash
npm run build
npm start
```

## 🧪 Uso con herramientas de desarrollo

Para desarrollo con herramientas como Postman, puedes usar el flag `api`:
```bash
npm run dev:api
```

Esto permite requests desde `undefined` origin (útil para Postman).

## 📞 Contacto

Mario Geovani Cobian Ayala - [mg.cobianayala@outlook.com](mailto:mg.cobianayala@outlook.com)

---

⭐ ¡No olvides dar una estrella si este proyecto te ayudó!
