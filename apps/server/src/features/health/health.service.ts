import type { TResponseSchema } from '@repo/schemas';
import { generateResponseWithData } from '@repo/schemas';
import { RESPONSE_STATUSES, RESPONSE_STATUSES_MESSAGES } from '@repo/utils';
import { HealthCheckRepository, THealthCheckList, isDbAlive } from '@repo/database';

import HealthUtils from './health.utility.js';

const generateHealthResponse: () => Promise<TResponseSchema> = () =>
  HealthUtils.serverAliveResponse();

const generateHealthDbResponse: () => Promise<TResponseSchema> = async () => {
  if (!(await isDbAlive())) {
    return HealthUtils.dbHotReadyResponse();
  }
  const healthCheckResult = await HealthCheckRepository.createHealthCheckRecord(
    RESPONSE_STATUSES_MESSAGES.DB_ALIVE
  );
  if (!healthCheckResult?.message) {
    return HealthUtils.dbHotReadyResponse();
  }
  const healthCheckList = await HealthCheckRepository.getHealthCheckRecords();
  if (!healthCheckList.length) {
    return HealthUtils.serverErrorResponse();
  }

  return generateResponseWithData<THealthCheckList>(
    RESPONSE_STATUSES.DB_ALIVE,
    healthCheckList,
    RESPONSE_STATUSES_MESSAGES.DB_ALIVE
  );
};

export default {
  generateHealthResponse,
  generateHealthDbResponse,
};
