import type { TResponseSchema } from '@repo/schemas';
import {
  generateQueryOptionsSchema,
  ResponseSchema,
  generateResponse,
  generateResponseWithData,
} from '@repo/schemas';
import { RESPONSE_STATUSES, RESPONSE_CODES, RESPONSE_STATUSES_MESSAGES } from '@repo/utils';
import { THealthCheckList, prisma } from '@repo/database';
import { HealthCheckRepository } from '@repo/database';
import { FastifyRequest } from 'fastify';
import { env } from '../../config/env.js';

const generateHealthResponse: (req: FastifyRequest) => Promise<TResponseSchema> = async (req) => {
  if (req.ip !== env.DOCKER_DEFAULT_IP) {
    const healthCheckResult = await HealthCheckRepository.createHealthCheckRecord(
      RESPONSE_STATUSES_MESSAGES.SERVER_ALIVE
    );
    if (!healthCheckResult.message) {
      return generateResponse(RESPONSE_STATUSES.SERVER_ERROR, 'Database is not ready!');
    }
    return generateResponse(RESPONSE_STATUSES.SERVER_ALIVE, healthCheckResult.message);
  }
  return generateResponse(RESPONSE_STATUSES.SERVER_ALIVE, RESPONSE_STATUSES_MESSAGES.SERVER_ALIVE);
};

const getReadyResponse: () => Promise<TResponseSchema> = async () => {
  await prisma.$connect();
  const result = await prisma.$queryRaw`SELECT 1`;
  if (!result) {
    return generateResponse(RESPONSE_STATUSES.SERVER_ERROR, 'Database is not ready!');
  }
  const healthCheckResult = await HealthCheckRepository.createHealthCheckRecord(
    RESPONSE_STATUSES_MESSAGES.DB_ALIVE
  );
  if (!healthCheckResult.message) {
    return generateResponse(RESPONSE_STATUSES.SERVER_ERROR, 'Database is not ready!');
  }
  return generateResponse(RESPONSE_STATUSES.DB_ALIVE, healthCheckResult.message);
};

const getHealthCheckData = async () => {
  await prisma.$connect();
  const result = await prisma.$queryRaw`SELECT 1`;
  if (!result) {
    return generateResponse(
      RESPONSE_STATUSES.SERVER_ERROR,
      RESPONSE_STATUSES_MESSAGES.SERVER_ERROR
    );
  }
  const healthCheckList = await HealthCheckRepository.getHealthCheckRecords();
  if (!healthCheckList.length) {
    return generateResponse(
      RESPONSE_STATUSES.SERVER_ERROR,
      RESPONSE_STATUSES_MESSAGES.SERVER_ERROR
    );
  }

  return generateResponseWithData<THealthCheckList>(
    RESPONSE_STATUSES.SUCCESS,
    healthCheckList,
    RESPONSE_STATUSES_MESSAGES.SUCCESS
  );
};

const ValidateOptionsSchema = {
  schema: generateQueryOptionsSchema({
    description: 'Health check response schema',
    code: RESPONSE_CODES[200],
    schema: ResponseSchema,
  }),
};

export default {
  generateHealthResponse,
  getReadyResponse,
  getHealthCheckData,
  ValidateOptionsSchema,
};
