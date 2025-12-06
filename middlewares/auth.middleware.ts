import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(400)
      .json({ message: "Authorization header must start with Bearer" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
}
