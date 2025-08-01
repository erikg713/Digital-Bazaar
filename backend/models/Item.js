export const ItemModel = {
  createTable: `
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      creator_id INTEGER REFERENCES users(id),
      name TEXT,
      description TEXT,
      price_pi INTEGER,
      file_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,
};
// backend/models/itemModel.js
import db from '../config.js';

export const getAllItems = async () => {
  const result = await db.query('SELECT * FROM items ORDER BY created_at DESC');
  return result.rows;
};

export const getItemById = async (id) => {
  const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0];
};

export const createItem = async (item) => {
  const { name, description, price, image_url, creator_id } = item;
  const result = await db.query(
    `INSERT INTO items (name, description, price, image_url, creator_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, description, price, image_url, creator_id]
  );
  return result.rows[0];
};
