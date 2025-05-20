# 📘 Prueba Técnica Angular - Lista de Usuarios

Esta es una aplicación Angular desarrollada como parte de una prueba técnica para la posición de Desarrollador de Software. La aplicación simula un flujo real de inicio de sesión, listado de usuarios, y visualización de detalles usando un servidor ficticio (`json-server`).

## Development server

Luego de clonar el proyecto, hay que instalar las dependencias con el siguiente comando:

```bash
npm install
```

Para correr localmente el proyecto ejecutar el siguiente comando:

```bash
ng serve
```

Para correr localmente el servidor ficticio ejecutar el siguiente comando:

```bash
npm run start:api
```

Esto levanta un servidor en http://localhost:3000 con:

/auth

/users

En `auth` estan las credenciales de inicio de sesion y en `users` estan los usarios posibles a listar 

## Deployment

El proyecto se encuentra desplegado en Netlify en esta url

https://userfrontapp.netlify.app

Antes de abrir el dominio y poder utilizarlo correctamente hay que correr el `json-server` con el comando que puse anteriormente para poder ingresar y ver los usuarios

Las credenciales de acceso son `admin` con su contraseña `123456`

## Tecnologías utilizadas

- Angular 17 con [Standalone Components]
- Angular Material (componentes UI)
- TypeScript
- SCSS para estilos personalizados
- json-server (API falsa para pruebas)

## Estructura del proyecto

```bash
src/
├── app/
│   ├── pages/
│   │   ├── login/           # Formulario de inicio de sesión
│   │   ├── user-list/       # Tabla de usuarios
│   │   └── user-detail/     # Vista de detalles del usuario
│   ├── services/
│   │   └── api.service.ts   # Conexión con json-server
│   ├── directives/          # Directivas personalizadas
│   ├── app.config.ts        # Configuración principal de la app
│   ├── app.routes.ts        # Rutas del proyecto

```
