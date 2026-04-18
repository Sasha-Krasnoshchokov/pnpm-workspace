import 'dotenv/config';
import { TResponseStatus } from './schema.js';
import type { TResponseSchema } from './schema.js';

const create = (status: TResponseStatus, message?: string): TResponseSchema => ({
  status,
  message: message || `Response with status: ${status}`,
  timestamp: new Date().toISOString(),
  uptime: process.uptime(),
});

const createWithData = <TData>(status: TResponseStatus, data: TData, message?: string) => ({
  ...create(status, message),
  data,
});

export const ResponseCreator = {
  create,
  createWithData,
};
