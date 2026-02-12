# Sistema de Seguimiento de Tickets - Prueba tecnica Motomex

Este sistema fue desarrollado con Nuxt 4, Vue 3, Nuxt UI y SQLite con drizzle. Permite crear, visualizar y gestionar tickets con diferentes estados y prioridades mediante un tablero estilo Kanban y una tabla interactiva.

## Requisitos

- Node.js 18+

## Pasos para correr el proyecto

1. **Clonar el repositorio**
```bash
git clone https://github.com/Tomasxwav/tickets-nuxt.git
cd tickets-nuxt
```

2. **Instalar las dependencias**
```bash
npm install
```

3. **Configurar las variables de entorno** (opcional)

Crea un archivo `.env` en la raíz del proyecto:
```env
DB_FILE_NAME=file:local.db
```

> **Nota**: Si no creas el archivo `.env`, se usará `file:local.db` por defecto.

4. **Inicializar la base de datos**
```bash
npm run db:seed
```

5. Iniciar el servidor de desarrollo en `http://localhost:3000`:

```bash
npm run dev
```

## Endpoints

### `GET /api/tickets`
Obtiene todos los tickets.

**Respuesta:**
```json
[
  {
    "id": 1,
    "title": "Error en login",
    "description": "No se puede iniciar sesión",
    "requestor": "Juan Pérez",
    "department": "soporte",
    "status": "open",
    "priority": "high",
    "createdAt": "2026-02-12T10:00:00.000Z"
  }
]
```

### `POST /api/tickets/create`
Crea un nuevo ticket.

**Body:**
```json
{
  "title": "Título del ticket",
  "description": "Descripción detallada",
  "requestor": "Nombre del solicitante",
  "department": "soporte",
  "priority": "medium",
  "status": "open"
}
```

### `PATCH /api/tickets/:id`
Actualiza el estado de un ticket.

**Body:**
```json
{
  "status": "in_progress"
}
```

## Desiciones tecnicas

Para el desarrollo de este proyecto decidí utilizar un framework full stack moderno como Nuxt, con el objetivo de centralizar en un mismo entorno el frontend, el backend y la conexión con la base de datos, y de esa forma tener un desarrollo mas rápido.

Como motor de base de datos opté por libSQL, una versión optimizada de SQLite recomendada por Drizzle, el ORM utilizado en el proyecto. Drizzle permite realizar consultas a la base de datos de manera tipada y segura desde TypeScript.

En el frontend, para optimizar tiempos de desarrollo y lograr un diseño moderno y consistente, utilicé Nuxt UI, una librería de componentes estilizados y funcionales. Esta librería se apoya en Tailwind CSS, lo que permite personalizar fácilmente los estilos.

## Stack usado

- **Frontend**: Nuxt 4, Vue 3, TypeScript
- **UI**: Nuxt UI, TailwindCSS
- **Base de Datos**: SQLite (libSQL)
- **ORM**: Drizzle ORM
- **Validación**: Zod