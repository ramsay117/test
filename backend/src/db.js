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

async function query(text, params) {
  const start = moment.tz('Asia/Kolkata');
  const res = await pool.query(text, params);
  const duration = moment.tz('Asia/Kolkata').diff(start, 'milliseconds');
  logger.info('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

async function getClient() {
  return pool.connect();
}

async function testConnection() {
  const res = await pool.query('SELECT NOW()');
  logger.info('Database connected', { time: res.rows[0].now });
}

export { pool, query, getClient, testConnection };
