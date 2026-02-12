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

> **Nota**: Si hay algún error con la base de datos, ejecuta los siguientes comandos:
> ```bash
> npx drizzle-kit generate
> npx drizzle-kit migrate
> ```

5. Iniciar el servidor de desarrollo en `http://localhost:3000`:

```bash
npm run dev
```

## Desiciones tecnicas

Para el desarrollo de este proyecto decidí utilizar un framework full stack moderno como Nuxt, con el objetivo de centralizar en un mismo entorno el frontend, el backend y la conexión con la base de datos, y de esa forma tener un desarrollo mas rápido.

Como motor de base de datos opté por libSQL, una versión optimizada de SQLite recomendada por Drizzle, el ORM utilizado en el proyecto. Drizzle permite realizar consultas a la base de datos de manera tipada y segura desde TypeScript.

Para el frontend para optimizar tiempos y hacer un diseño moderno utilize Nuxt UI que es una libreria de componentes estilizados y con funcionalidad optimizada ademas de que hace uso de Tailwind CSS para poder customizarlos.

### Desiciones de diseño

Para el diseño de la aplicación me basé en Jira, un sistema de gestión de tareas que utiliza un tablero tipo Kanban con funcionalidad drag and drop para mover las tareas entre distintos estados. Elegí este enfoque porque considero que es una forma cómoda, visual e intuitiva de organizar la información, además de permitir una actualización rápida de los estados.

Sin embargo, también opté por implementar la estructura tradicional de los sistemas de tickets, una vista en formato de tabla o lista, donde los tickets se muestran ordenados por fecha, colocando los más recientes al inicio. Esto facilita su seguimiento segun se requiera.


### Stack usado

- **Frontend**: Nuxt 4, Vue 3, TypeScript
- **UI**: Nuxt UI, TailwindCSS
- **Base de Datos**: SQLite (libSQL)
- **ORM**: Drizzle ORM
- **Validación**: Zod