import { z } from 'zod';
import 'dotenv/config';

export const envSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  ARGON2_SECRET: z.string(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
