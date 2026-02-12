import type { Ticket } from '~/types/tickets';

export const mockTickets: Ticket[] = [
  {
    id: 1,
    title: 'Error en el login de usuarios',
    description: 'Los usuarios no pueden iniciar sesión en el sistema desde esta mañana. Aparece un error 500.',
    requestor: 'María García',
    department: 'soporte',
    createdAt: '2026-02-10T09:30:00',
    status: 'open',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Optimizar consultas de base de datos',
    description: 'Las consultas a la base de datos están tomando demasiado tiempo. Necesitamos optimizar los índices.',
    requestor: 'Juan Pérez',
    department: 'desarrollo',
    createdAt: '2026-02-09T14:15:00',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Actualizar documentación de API',
    description: 'La documentación de la API REST necesita actualizarse con los nuevos endpoints implementados.',
    requestor: 'Pedro Martínez',
    department: 'desarrollo',
    createdAt: '2026-02-08T11:00:00',
    status: 'resolved',
    priority: 'low'
  },
  {
    id: 4,
    title: 'Servidor caído en producción',
    description: 'El servidor principal de producción no responde. Los clientes no pueden acceder al sistema.',
    requestor: 'Laura Sánchez',
    department: 'operaciones',
    createdAt: '2026-02-11T08:00:00',
    status: 'open',
    priority: 'urgent',
  },
  {
    id: 5,
    title: 'Implementar notificaciones push',
    description: 'Necesitamos agregar funcionalidad de notificaciones push para la aplicación móvil.',
    requestor: 'Roberto Fernández',
    department: 'desarrollo',
    createdAt: '2026-02-07T16:45:00',
    status: 'in_progress',
    priority: 'medium'
  },
  {
    id: 6,
    title: 'Corregir diseño responsive en móviles',
    description: 'El diseño no se ve correctamente en dispositivos móviles pequeños. Varios elementos se superponen.',
    requestor: 'Carmen Díaz',
    department: 'marketing',
    createdAt: '2026-02-06T10:20:00',
    status: 'closed',
    priority: 'high'
  },
  {
    id: 7,
    title: 'Agregar validación de formularios',
    description: 'Los formularios de contacto necesitan validación adicional para prevenir spam.',
    requestor: 'Diego Ruiz',
    department: 'ventas',
    createdAt: '2026-02-05T13:30:00',
    status: 'resolved',
    priority: 'medium'
  },
  {
    id: 8,
    title: 'Problema con carga de imágenes',
    description: 'Las imágenes no se cargan correctamente en el módulo de galería. Error al subir archivos grandes.',
    requestor: 'Elena Moreno',
    department: 'administracion',
    createdAt: '2026-02-11T07:15:00',
    status: 'open',
    priority: 'high',
  }
];

export const fetchTickets = async (delay: number = 500): Promise<Ticket[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTickets);
    }, delay);
  });
};

export const fetchTicketById = async (id: number, delay: number = 300): Promise<Ticket | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ticket = mockTickets.find(t => t.id === id);
      resolve(ticket || null);
    }, delay);
  });
};

export const fetchTicketsByStatus = async (
  status: Ticket['status'],
  delay: number = 400
): Promise<Ticket[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockTickets.filter(t => t.status === status);
      resolve(filtered);
    }, delay);
  });
};

export const fetchTicketsByPriority = async (
  priority: Ticket['priority'],
  delay: number = 400
): Promise<Ticket[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockTickets.filter(t => t.priority === priority);
      resolve(filtered);
    }, delay);
  });
};
