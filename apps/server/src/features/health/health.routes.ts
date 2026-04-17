import type { FastifyInstance } from 'fastify/types/instance.js';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import HealthService from './health.service.js';
import HealthUtils from './health.utility.js';

const healthRoutes: FastifyPluginAsyncZod = async (app: FastifyInstance) => {
  app.get(
    '/health',
    HealthUtils.ValidateOptionsSchema,
    async () => await HealthService.generateHealthResponse()
  );

  app.get('/health-db', async () => await HealthService.generateHealthDbResponse());
};

export default healthRoutes;
