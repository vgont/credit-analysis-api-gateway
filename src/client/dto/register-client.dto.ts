import { z } from 'zod';

export const registerClientSchema = z.object({
  name: z.string(),
  invoicing: z.number(),
  hasCriminalRecord: z.boolean(),
  email: z.string().email(),
  password: z.string().min(8),
});
export type RegisterClientDto = z.infer<typeof registerClientSchema>;
