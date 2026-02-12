import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { ticketsTable } from '~~/server/db/schema';
  

export default defineEventHandler(async (event) => {
  const { db_file_name } = useRuntimeConfig();
  const db = drizzle(db_file_name);

  const tickets = await db.select().from(ticketsTable);
  
  return tickets.map(ticket => ({
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    requestor: ticket.requestor,
    department: ticket.department,
    status: ticket.status,
    priority: ticket.priority,
    createdAt: new Date(ticket.created_at).toISOString()
  }))
})