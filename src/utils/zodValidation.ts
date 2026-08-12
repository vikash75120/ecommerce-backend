import {z} from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  password: z.string().min(8)
});
