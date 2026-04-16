import type { FastifyInstance } from 'fastify/types/instance.js';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import HealthService from './health.service.js';

const healthRoutes: FastifyPluginAsyncZod = async (app: FastifyInstance) => {
  app.get(
    '/health',
    HealthService.ValidateOptionsSchema,
    async (req) => await HealthService.generateHealthResponse(req)
  );

  app.get('/ready', async () => {
    return await HealthService.getReadyResponse();
  });

  app.get('/ready/all', async () => {
    return await HealthService.getHealthCheckData();
  });
};

export default healthRoutes;
