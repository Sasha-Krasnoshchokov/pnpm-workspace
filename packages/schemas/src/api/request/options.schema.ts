import z from 'zod';
import { RESPONSE_CODES } from '@repo/utils';

export const OptionsSchema = z.object({
  description: z.string(),
  response: z.object({
    [typeof RESPONSE_CODES]: z.ZodType,
  }),
});

export const generateQueryOptionsSchema = <TSchema extends z.ZodType>(props: {
  description: string;
  code: keyof typeof RESPONSE_CODES;
  schema: TSchema;
}): z.infer<typeof OptionsSchema> => {
  const { description, code, schema } = props;
  return {
    description,
    response: {
      [code]: schema as TSchema,
    },
  };
};
