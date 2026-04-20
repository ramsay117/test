import express from 'express';
import { withTransaction, execute } from './db.js';
import { logger } from './logger.js';

const urlShortenerRouter = express.Router();

const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function toBase62(num) {
  if (num === 0) return BASE62_CHARS[0];
  let result = '';
  while (num > 0) {
    result = BASE62_CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}

urlShortenerRouter.post('/shorten-url', async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const shortCode = await withTransaction(async (client) => {
      const insertResult = await client.query(
        'INSERT INTO url_shortener (short_code, original_url) VALUES ($1, $2) RETURNING id',
        ['temp', originalUrl],
      );
      const id = insertResult.rows[0].id;
      const code = toBase62(id);
      await client.query(
        'UPDATE url_shortener SET short_code = $1 WHERE id = $2',
        [code, id],
      );
      return code;
    });
    return res.json({ shortenedUrl: `http://localhost:${process.env.PORT}/api/short-url/${shortCode}` });
  } catch (error) {
    logger.error('Failed to shorten URL', { error: error.message, stack: error.stack });
    return res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

urlShortenerRouter.get('/short-url/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  try {
    const result = await execute(
      'SELECT original_url FROM url_shortener WHERE short_code = $1 AND (expires_at IS NULL OR expires_at > NOW()) LIMIT 1',
      [shortCode],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'URL not found or expired' });
    }
    return res.redirect(301, result.rows[0].original_url);
  } catch (error) {
    logger.error('Failed to fetch original URL', { error: error.message, stack: error.stack });
    return res.status(500).json({ error: 'Failed to fetch URL' });
  }
});

export { urlShortenerRouter };
