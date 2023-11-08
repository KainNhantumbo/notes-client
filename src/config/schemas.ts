import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter your email.' })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: 'Password field must have at least 8 characters.' })
    .trim()
});

export const signupSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'First name must have a minimun of 2 characters.' })
    .max(32, { message: 'First name must have less than 32 characters.' })
    .trim(),
  last_name: z
    .string()
    .min(2, { message: 'Last name must have a minimun of 2 characters.' })
    .max(32, { message: 'Last name must have less than 32 characters.' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please enter your email.' })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Your password must have at least 8 characters.' })
    .max(20, { message: 'Your password must have less than 20 characters.' }),
  confirm_password: z
    .string()
    .trim()
    .min(8, { message: 'Your password must have at least 8 characters.' })
    .max(20, { message: 'Your password must have less than 20 characters.' })
});
