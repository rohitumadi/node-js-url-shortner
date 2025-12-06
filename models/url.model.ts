import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model";

export const urlsTable = pgTable("urls", {
    id: uuid().primaryKey().defaultRandom(),
    originalUrl: varchar("original_url", { length: 255 }).notNull(),
    shortCode: varchar("short_code", { length: 155 }).notNull().unique(),

    userId: uuid("user_id").notNull().references(() => usersTable.id),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp()
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});