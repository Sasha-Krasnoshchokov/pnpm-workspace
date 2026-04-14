import z from 'zod';
import { TResponseSchema } from '../index.js';

export const extendSchemaBy = <TSchema extends TResponseSchema, TExtend extends z.ZodType>(
  schema: TSchema,
  extension: TExtend
): z.ZodType => {
  return {
    ...schema,
    ...extension,
  };
};
