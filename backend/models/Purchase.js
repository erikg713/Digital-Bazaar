export const PurchaseModel = {
  createTable: `
    CREATE TABLE IF NOT EXISTS purchases (
      id SERIAL PRIMARY KEY,
      buyer_id INTEGER REFERENCES users(id),
      item_id INTEGER REFERENCES items(id),
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,
};
