# CRA-Sports Project

Plataforma modular y escalable para la gestión de equipos deportivos.

## Estructura del Proyecto

- `/cra-sports-backend`: Backend en Node.js/Express con TypeScript
- `/cra-sports-frontend-web`: Frontend en React con Vite, TypeScript, TailwindCSS, Tremor y shadcn/ui

## Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn

## Configuración del Entorno

1. Clonar el repositorio
2. Configurar las variables de entorno:
   - Copiar `.env.example` a `.env` en el backend
   - Ajustar las variables según sea necesario

## Desarrollo

### Backend

```bash
cd cra-sports-backend
npm install
npm run dev
```

El servidor backend se ejecutará en http://localhost:3001

### Frontend

```bash
cd cra-sports-frontend-web
npm install
npm run dev
```

La aplicación frontend se ejecutará en http://localhost:5173

## Características

- Autenticación múltiple (email/password, Google, Instagram, Strava, Garmin)
- Interfaz de usuario moderna y responsiva
- Modo oscuro
- Diseño modular y escalable
- Sincronización de datos en tiempo real 