import express from "express";
import { z } from "zod";
import {
  loginRequestValidation,
  signupRequestValidation,
} from "../validations/request.validations";
import { hashPasswordWithSalt, verifyPassword } from "../util/utils";
import { createUser, getUserByEmail } from "../services/user.service";
import jwt from "jsonwebtoken";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const validatedData = signupRequestValidation.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json(z.treeifyError(validatedData.error));
  }
  const { firstName, lastName, email, password } = validatedData.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res
      .status(400)
      .json({ message: `User with this email ${email} already exists` });
  }

  const { salt, hashedPassword } = hashPasswordWithSalt(password);
  const user = await createUser(
    firstName,
    lastName ?? "",
    email,
    hashedPassword,
    salt
  );

  res.status(201).json({
    message: "User created successfully",
    data: {
      id: user.id,
    },
  });
});

userRouter.post("/login", async (req, res) => {
  const validatedData = loginRequestValidation.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json(z.treeifyError(validatedData.error));
  }
  const { email, password } = validatedData.data;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isPasswordValid = verifyPassword(password, user.password!, user.salt!);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  res.status(200).json({ message: "Login successful", token: token });
});
export default userRouter;
