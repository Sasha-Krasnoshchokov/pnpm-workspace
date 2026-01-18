import { z } from 'zod';
import 'dotenv/config';

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default(3210),
  API_PREFIX: z.string().default('/api/v1'),
});

export const env = serverEnvSchema.parse(process.env);
