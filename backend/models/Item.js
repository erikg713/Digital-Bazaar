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
