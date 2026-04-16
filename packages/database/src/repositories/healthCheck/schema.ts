import z from 'zod';
import { HealthCheckRecord } from '../../../prisma/generated/prisma';

export const HealthCheckSchema = z.object({
  id: z.string(),
  message: z.string(),
  createdAt: z.date(),
}) satisfies z.ZodType<HealthCheckRecord>;

export const HealthCheckListSchema = z.array(HealthCheckSchema);

export type THealthCheckSchema = z.infer<typeof HealthCheckSchema>;
export type THealthCheckList = z.infer<typeof HealthCheckListSchema>;
