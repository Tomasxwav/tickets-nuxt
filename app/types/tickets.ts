export interface Ticket {
  id: number;
  title: string;
  description: string;
  requestor: string;
  department: string;
  createdAt: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
}

export interface TicketFormData {
  title: string
  description: string
  requestor: string
  department: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}