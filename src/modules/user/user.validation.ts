import { z } from "zod";


export const zodUserSchema = z.object({
  userId: z.number().int({message:'user id must be an integer'}),
  userName: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email({message:'invalid email address.'}),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
  })),
});
