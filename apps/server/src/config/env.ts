import { z } from 'zod';
import 'dotenv/config';

export const serverEnvSchema = z.object({
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3210),
  API_PREFIX: z.string().default('/api/v1'),
  DATABASE_URL: z.string().url(),
  DOCKER_DEFAULT_IP: z.string().default('127.0.0.1'),
  CORS_ORIGINS: z.string().transform((str) => str.split(',')),
});
const _env = serverEnvSchema.safeParse(process.env);
if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
