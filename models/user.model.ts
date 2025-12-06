import { pgTable, varchar, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  salt: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
