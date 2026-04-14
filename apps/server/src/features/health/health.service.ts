import type { TResponseSchema } from '@repo/schemas';

import { generateQueryOptionsSchema, ResponseSchema, generateResponse } from '@repo/schemas';
import { RESPONSE_STATUSES, RESPONSE_CODES } from '@repo/utils';

const HealthResponse: TResponseSchema = generateResponse(
  RESPONSE_STATUSES.SUCCESS,
  'Service is healthy!'
);

const getReadyResponse = async () => {
  return { status: 'ready' };
};

const ValidateOptionsSchema = {
  schema: generateQueryOptionsSchema({
    description: 'Health check response schema',
    code: RESPONSE_CODES[200],
    schema: ResponseSchema,
  }),
};

export default { HealthResponse, getReadyResponse, ValidateOptionsSchema };
