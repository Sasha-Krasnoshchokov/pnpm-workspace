import z from 'zod';
import { RESPONSE_CODES } from '@repo/utils';

const _PropsSchema = z.object({
  description: z.string(),
  code: z.enum(RESPONSE_CODES),
  schema: z.ZodType,
});
export const generateQueryOptionsSchema = <TSchema extends z.ZodType>(
  props: z.infer<typeof _PropsSchema>
) => {
  const { description, code, schema } = props;
  return {
    description,
    response: {
      [code]: schema as TSchema,
    },
  };
};
