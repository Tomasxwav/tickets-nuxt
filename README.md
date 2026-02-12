# Sistema de Seguimiento de Tickets - Prueba tecnica Motomex

Este sistema fue desarrollado con Nuxt 4, Vue 3, Nuxt UI y SQLite con drizzle. Permite crear, visualizar y gestionar tickets con diferentes estados y prioridades mediante un tablero estilo Kanban y una tabla interactiva.

## Stack usado

- **Frontend**: Nuxt 4, Vue 3, TypeScript
- **UI**: Nuxt UI, TailwindCSS
- **Base de Datos**: SQLite (libSQL)
- **ORM**: Drizzle ORM
- **Validación**: Zod

## Requisitos

- Node.js 18+ o superior
- npm, pnpm, yarn o bun

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

Este comando creará la base de datos SQLite y la poblará con datos de ejemplo.

5. Inicia el servidor de desarrollo en `http://localhost:3000`:

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

