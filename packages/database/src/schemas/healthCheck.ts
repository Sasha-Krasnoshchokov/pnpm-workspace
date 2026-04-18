import z from 'zod';
import type { HealthCheckRecord } from '../types/types.js';

export const HealthCheckRecordCreate = z.object({
  message: z.string().min(1).max(255),
});

export const HealthCheckSchema = HealthCheckRecordCreate.extend({
  id: z.string(),
  createdAt: z.date(),
}) satisfies z.ZodType<HealthCheckRecord>;

export const HealthCheckRecords = z.array(HealthCheckSchema);

export type THealthCheckRecordCreate = z.infer<typeof HealthCheckRecordCreate>;
export type THealthCheckRecord = z.infer<typeof HealthCheckSchema>;
export type THealthCheckRecords = z.infer<typeof HealthCheckRecords>;
