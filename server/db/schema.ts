import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ticketsTable = sqliteTable("tickets_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  status: text().notNull(),
  priority: text().notNull(),
  requestor: text().notNull(),
  department: text().notNull(),
  created_at: int().notNull(),
  updated_at: int().notNull()
});
