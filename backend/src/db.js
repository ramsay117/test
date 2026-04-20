import pg from 'pg';
import moment from 'moment-timezone';
import { logger } from './logger.js';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', { error: err.message, stack: err.stack });
});

async function execute(text, params) {
  const start = moment.tz('Asia/Kolkata');
  const res = await pool.query(text, params);
  const duration = moment.tz('Asia/Kolkata').diff(start, 'milliseconds');
  logger.info('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

async function withTransaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function testConnection() {
  const res = await pool.query('SELECT NOW()');
  logger.info('Database connected', { time: res.rows[0].now });
}

export { pool, execute, withTransaction, testConnection };
