import type { FastifyInstance } from 'fastify/types/instance.js';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import HealthService from './health.service.js';

const healthRoutes: FastifyPluginAsyncZod = async (app: FastifyInstance) => {
  app.get('/health', HealthService.ValidateOptionsSchema, async () =>
    HealthService.generateHealthResponse()
  );

  app.get('/ready', async () => {
    return { status: 'ready' };
  });
};

export default healthRoutes;
