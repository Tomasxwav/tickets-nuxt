import { drizzle } from 'drizzle-orm/libsql';
import { ticketsTable } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { db_file_name } = useRuntimeConfig();
  const db = drizzle(db_file_name);
  try {
    const body = await readBody(event);
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Ticket ID is required'
      });
    }
    const existingTicket = await db.select().from(ticketsTable).where(eq(ticketsTable.id, Number(id))).get();
    if (!existingTicket) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: 'Ticket not found'
      });
    }
    const updatedTicket: Partial<typeof ticketsTable.$inferInsert> = {
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      requestor: body.requestor,
      department: body.department,
      updated_at: Date.now()
    };
    await db.update(ticketsTable).set(updatedTicket).where(eq(ticketsTable.id, Number(id)));
    return {
      message: 'Ticket updated successfully!'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    console.error('Error updating ticket:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to update ticket. Please try again later.'
    });
  }
})