import { FastifyInstance } from 'fastify/types/instance.js';
import healthRoutes from '../features/health/health.routes.js';

const routes = async (app: FastifyInstance) => {
  await app.register(healthRoutes);
};

export default routes;
