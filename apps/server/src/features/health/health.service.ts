import type { TResponseSchema } from '@repo/schemas';
import { ResponseCreator } from '@repo/schemas';
import { RESPONSE_STATUSES, RESPONSE_STATUSES_MESSAGES } from '@repo/utils';
import { HealthCheckRepository, THealthCheckRecords, isDbAlive } from '@repo/database';

import HealthUtils from './health.utility.js';

const generateHealthResponse: () => Promise<TResponseSchema> = () =>
  HealthUtils.serverAliveResponse();

const generateHealthDbResponse: () => Promise<TResponseSchema> = async () => {
  if (!(await isDbAlive())) {
    return HealthUtils.dbHotReadyResponse();
  }
  const healthCheckResult = await HealthCheckRepository.createRecord({
    message: RESPONSE_STATUSES_MESSAGES.DB_ALIVE,
  });
  if (!healthCheckResult?.message) {
    return HealthUtils.dbHotReadyResponse();
  }
  const healthCheckList = await HealthCheckRepository.getRecords();
  if (!healthCheckList.length) {
    return HealthUtils.serverErrorResponse();
  }

  return ResponseCreator.createWithData<THealthCheckRecords>(
    RESPONSE_STATUSES.DB_ALIVE,
    healthCheckList,
    RESPONSE_STATUSES_MESSAGES.DB_ALIVE
  );
};

export default {
  generateHealthResponse,
  generateHealthDbResponse,
};
