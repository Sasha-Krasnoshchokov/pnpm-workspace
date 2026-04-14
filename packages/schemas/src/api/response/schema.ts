import { RESPONSE_STATUSES } from '@repo/utils';
import z from 'zod';

export const ResponseSchema = z.object({
  status: z.enum(RESPONSE_STATUSES),
  timestamp: z.string().datetime(),
  uptime: z.number(),
  message: z.string().optional(),
});

export type TResponseStatus = (typeof RESPONSE_STATUSES)[keyof typeof RESPONSE_STATUSES];
export type TResponseSchema = z.infer<typeof ResponseSchema>;
