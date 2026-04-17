import 'dotenv/config';
import { TResponseStatus } from './schema.js';
import type { TResponseSchema } from './schema.js';

export const generateResponse = (status: TResponseStatus, message?: string): TResponseSchema => ({
  status,
  message: message || `Response with status: ${status}`,
  timestamp: new Date().toISOString(),
  uptime: process.uptime(),
});

export const generateResponseWithData = <TData>(
  status: TResponseStatus,
  data: TData,
  message?: string
) => ({
  ...generateResponse(status, message),
  data,
});
