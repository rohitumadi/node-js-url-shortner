import { z } from "zod";


export const shortenUrlRequestValidation = z.object({
  originalUrl: z.url(),
})

export const signupRequestValidation = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.email(),
  password: z.string().min(6),
});

export const loginRequestValidation = z.object({
  email: z.email(),
  password: z.string().min(6),
});
