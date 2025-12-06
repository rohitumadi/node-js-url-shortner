import { createHmac, randomBytes } from "crypto";

export function hashPasswordWithSalt(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return { salt, hashedPassword };
}

export function verifyPassword(
  password: string,
  hashedPassword: string,
  salt: string
) {
  const hashedPasswordWithSalt = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return hashedPasswordWithSalt === hashedPassword;
}
