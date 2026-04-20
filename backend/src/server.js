import dotenv from 'dotenv';
import express from 'express';
import { pool, testConnection } from './db.js';
import { logger } from './logger.js';
import { urlShortenerRouter } from './url-shortener.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', urlShortenerRouter);

const server = app.listen(process.env.PORT, async () => {
  logger.info('Server is running', { port: process.env.PORT });
  try {
    await testConnection();
  } catch (err) {
    logger.error('Database connection failed', { error: err.message, stack: err.stack });
  }
});

function gracefulShutdown(signal) {
  logger.info('Shutdown signal received', { signal });
  server.close(() => {
    logger.info('HTTP server closed');
    pool.end(() => {
      logger.info('Database pool closed');
      process.exit(0);
    });
  });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', { error: err.message, stack: err.stack });
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', { reason });
  gracefulShutdown('unhandledRejection');
});

