import { z } from 'zod';

export const createAnalysisSchema = z.object({
  hasCriminalRecord: z.boolean(),
  clientEmail: z.string(),
  invoicing: z.number(),
});

export type CreateAnalysisDto = z.infer<typeof createAnalysisSchema>;
