import { generateQueryOptionsSchema, ResponseCreator, ResponseSchema } from '@repo/schemas';
import { RESPONSE_CODES, RESPONSE_STATUSES, RESPONSE_STATUSES_MESSAGES } from '@repo/utils';

const HealthUtils = {
  serverNotReadyResponse: async () =>
    ResponseCreator.create(RESPONSE_STATUSES.SERVER_ERROR, 'Server is not ready!'),
  serverAliveResponse: async () =>
    ResponseCreator.create(RESPONSE_STATUSES.SERVER_ALIVE, RESPONSE_STATUSES_MESSAGES.SERVER_ALIVE),
  serverErrorResponse: async () =>
    ResponseCreator.create(RESPONSE_STATUSES.SERVER_ERROR, RESPONSE_STATUSES_MESSAGES.SERVER_ERROR),
  dbHotReadyResponse: async () =>
    ResponseCreator.create(RESPONSE_STATUSES.SERVER_ERROR, 'Database is not ready!'),
  ValidateOptionsSchema: {
    schema: generateQueryOptionsSchema({
      description: 'Health check response schema',
      code: RESPONSE_CODES[200],
      schema: ResponseSchema,
    }),
  },
};

export default HealthUtils;
