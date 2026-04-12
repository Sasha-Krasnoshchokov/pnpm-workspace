import Fastify from 'fastify';
import { env } from './config/env.js';
import { FastifyRequest } from 'fastify/types/request.js';
import { FastifyReply } from 'fastify/types/reply.js';
import routes from './plugins/app.routes.js';
import { serializerCompiler } from 'fastify-type-provider-zod';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
const buildApp = async () => {
  const app = Fastify({
    logger: {
      level: 'info',
      transport:
        env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
  });
  app.setSerializerCompiler(serializerCompiler);

  app.addContentTypeParser(
    'application/json',
    { parseAs: 'string' },
    app.getDefaultJsonParser('error', 'error')
  );

  await routes(app);

  return app;
};

const server = await buildApp();
export const ServerLogger = server.log;

export default server;
