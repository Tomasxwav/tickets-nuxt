import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { ticketsTable } from '~~/server/db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

const createTicketSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must not exceed 255 characters'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description must not exceed 2000 characters'),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed'], {error: 'Status must be one of: open, in_progress, resolved, closed'}),
  priority: z.enum(['low', 'medium', 'high', 'urgent'], {error: 'Priority must be one of: low, medium, high, urgent'}),
  requestor: z.string().min(1, 'Requestor is required'),
  department: z.string().min(1, 'Department is required')
});

export default defineEventHandler(async (event) => {
  const { db_file_name } = useRuntimeConfig();
  const db = drizzle(db_file_name);

  try {
    const body = await readBody(event);

    const ticketResult = readValidatedBody(event, createTicketSchema.parse);
 
    const existingTickets = await db.select().from(ticketsTable).where(eq(ticketsTable.title, (await ticketResult).title)).get();

    if (existingTickets) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Conflict',
        message: 'A ticket with the same title already exists. Please choose a different title.'
      });
    }

    const newTicket: typeof ticketsTable.$inferInsert = {
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      requestor: body.requestor,
      department: body.department,
      created_at: Date.now(),
      updated_at: Date.now()
    };

    await db.insert(ticketsTable).values(newTicket);

    return {
      success: true,
      message: 'New ticket created successfully!'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    console.error('Error creating ticket:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to create ticket. Please try again later.'
    });
  }
})
