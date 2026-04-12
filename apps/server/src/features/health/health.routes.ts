import { FastifyInstance } from 'fastify/types/instance.js';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import z from 'zod';

import { RESPONSE_STATUSES } from '@repo/utils';

const healthRoutes: FastifyPluginAsyncZod = async (app: FastifyInstance) => {
  app.get(
    '/health',
    {
      // schema: ApiResponse.healthOptions(),
      schema: {
        description: 'Health check response',
        // response: {
        //   200: ResponseSchema,
        // },
        response: {
          200: z.object({
            status: z.enum(['ok', 'error', 'maintenance']),
            timestamp: z.string().datetime(),
            uptime: z.number(),
            message: z.string().optional(),
          }),
        },
      },
    },
    async () => {
      console.info({ RESPONSE_STATUSES });
      // return generateResponse(RESPONSE_STATUSES.SUCCESS, 'Service is healthy!', undefined);
      return {
        status: 'ok',
        message: 'Service is healthy!',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      };
      // return ApiResponse.healthResponse();
    }
  );

  app.get('/ready', async () => {
    return { status: 'ready' };
  });
};

export default healthRoutes;
