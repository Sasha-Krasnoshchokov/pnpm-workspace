import z from 'zod';
import { TResponseStatus } from './schema.js';
import type { TResponseSchema } from './schema.js';
import { extendSchemaBy } from '../schemaExtension.js';

export const generateResponse = (status: TResponseStatus, message?: string) =>
  ({
    status,
    message: message || `Response with status: ${status}`,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }) as TResponseSchema;

export const generateResponseWithData = <TData extends z.ZodType>(
  status: TResponseStatus,
  data: TData,
  message?: string
) => extendSchemaBy<TResponseSchema, TData>(generateResponse(status, message), data);
