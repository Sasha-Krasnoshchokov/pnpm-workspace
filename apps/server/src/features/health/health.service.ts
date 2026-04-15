import type { TResponseSchema } from '@repo/schemas';

import { generateQueryOptionsSchema, ResponseSchema, generateResponse } from '@repo/schemas';
import { RESPONSE_STATUSES, RESPONSE_CODES } from '@repo/utils';

import { prisma } from '@repo/database';

const generateHealthResponse: () => TResponseSchema = () =>
  generateResponse(RESPONSE_STATUSES.SUCCESS, 'Service is healthy!');

const getReadyResponse = async () => {
  const isDatabaseConnected = await prisma.$connect();
  const result = await prisma.$queryRaw`SELECT 1`;
  console.info('Database connection status:', { isDatabaseConnected }, { result });
  if (!result) {
    return generateResponse(RESPONSE_STATUSES.SERVER_ERROR, 'Service is not ready!');
  }
  return generateResponse(RESPONSE_STATUSES.SUCCESS, 'Service is ready!');
};

const ValidateOptionsSchema = {
  schema: generateQueryOptionsSchema({
    description: 'Health check response schema',
    code: RESPONSE_CODES[200],
    schema: ResponseSchema,
  }),
};

export default { generateHealthResponse, getReadyResponse, ValidateOptionsSchema };
