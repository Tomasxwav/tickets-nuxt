import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { ticketsTable } from '~~/server/db/schema';
  

export default defineEventHandler(async (event) => {
  const { db_file_name } = useRuntimeConfig();
  const db = drizzle(db_file_name);

  const tickets = await db.select().from(ticketsTable);
  return tickets
})