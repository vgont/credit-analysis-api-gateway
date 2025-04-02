import { z } from 'zod';

export const getAllCreditAnalysisSchema = z.string().email();
