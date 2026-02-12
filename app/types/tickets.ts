export interface Ticket {
  id: number;
  description: string;
  createdAt: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}
