import app from './app.js';
import { env } from './config/env.js';

const { PORT, NODE_ENV } = env;

const server = app.listen(PORT, async () => {
  try {
    //check database connection
  } catch (error) {
    console.error('Error during Data Source initialization', error);
    throw error;
  } finally {
    console.info(`Server running in ${NODE_ENV} mode on: http://localhost:${PORT}`);
  }
});

// Graceful Shutdown
const shutdown = () => {
  console.info('Stopping server...');
  server.close(() => {
    console.info('Server stopped.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
