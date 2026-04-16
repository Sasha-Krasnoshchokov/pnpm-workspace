import 'dotenv/config';
import { TResponseStatus } from './schema.js';
import type { TResponseSchema } from './schema.js';
import { extendResponseBy } from './responseExtension.js';

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
) => extendResponseBy<TResponseSchema, TData>(generateResponse(status, message), data);
