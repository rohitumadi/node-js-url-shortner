import db from "../db/index";
import { usersTable } from "../models/index";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      password: usersTable.password,
      salt: usersTable.salt,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return existingUser;
}

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  salt: string
) {
  const [user] = await db
    .insert(usersTable)
    .values({ firstName, lastName, email, password, salt })
    .returning({ id: usersTable.id });
  return user;
}
