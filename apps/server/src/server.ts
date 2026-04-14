import server from './app.js';
import { env } from './config/env.js';

const start = async () => {
  const port = Number(env.PORT);

  try {
    await server.listen({ port, host: '0.0.0.0' });
    server.log.info(`BAssis Server is live on: http://localhost:${port}`);
  } catch (err) {
    server.log.error(err, 'BAssis Server connection failed:');
    process.exit(1);
  }
};

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    server.log.info(`Received ${signal}. Shutting down gracefully...`);
    try {
      await server.close();
      server.log.info('Closed all connections.');
      process.exit(0);
    } catch (err) {
      server.log.error(err, 'Error during graceful shutdown');
      process.exit(1);
    }
  });
});

start();
