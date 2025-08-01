import { pool } from '../db.js';

export const uploadItem = async (req, res) => {
  const { creator_id, name, description, price_pi, file_url } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO items (creator_id, name, description, price_pi, file_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [creator_id, name, description, price_pi, file_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Item upload failed', details: err });
  }
};

export const getItems = async (_req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM items ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items', details: err });
  }
};
import { pool } from '../db.js';

export const uploadItem = async (req, res) => {
  const { creator_id, name, description, price_pi, file_url } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO items (creator_id, name, description, price_pi, file_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [creator_id, name, description, price_pi, file_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Item upload failed', details: err });
  }
};

export const getItems = async (_req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM items ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items', details: err });
  }
};
