import type { Ticket } from '~/types/tickets';

export const mockTickets: Ticket[] = [
  {
    id: 1,
    description: 'Error en el login de usuarios',
    createdAt: '2026-02-10T09:30:00',
    status: 'open',
    priority: 'high'
  },
  {
    id: 2,
    description: 'Optimizar consultas de base de datos',
    createdAt: '2026-02-09T14:15:00',
    status: 'in_progress',
    priority: 'medium'
  },
  {
    id: 3,
    description: 'Actualizar documentación de API',
    createdAt: '2026-02-08T11:00:00',
    status: 'resolved',
    priority: 'low'
  },
  {
    id: 4,
    description: 'Servidor caído en producción',
    createdAt: '2026-02-11T08:00:00',
    status: 'open',
    priority: 'urgent'
  },
  {
    id: 5,
    description: 'Implementar notificaciones push',
    createdAt: '2026-02-07T16:45:00',
    status: 'in_progress',
    priority: 'medium'
  },
  {
    id: 6,
    description: 'Corregir diseño responsive en móviles',
    createdAt: '2026-02-06T10:20:00',
    status: 'closed',
    priority: 'high'
  },
  {
    id: 7,
    description: 'Agregar validación de formularios',
    createdAt: '2026-02-05T13:30:00',
    status: 'resolved',
    priority: 'medium'
  },
  {
    id: 8,
    description: 'Problema con carga de imágenes',
    createdAt: '2026-02-11T07:15:00',
    status: 'open',
    priority: 'high'
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
