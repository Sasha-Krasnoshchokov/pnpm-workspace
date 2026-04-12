import { z } from 'zod';
import 'dotenv/config';

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3210),
  API_PREFIX: z.string().default('/api/v1'),
  DATABASE_URL: z.string().url(),
  CORS_ORIGINS: z.string().transform((str) => str.split(',')),
});

export const env = serverEnvSchema.parse(process.env);
