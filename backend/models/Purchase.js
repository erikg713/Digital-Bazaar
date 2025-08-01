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
export const PurchaseModel = {
  createTable: `
    CREATE TABLE IF NOT EXISTS purchases (
      id SERIAL PRIMARY KEY,
      buyer_id INTEGER REFERENCES users(id),
      item_id INTEGER REFERENCES items(id),
      pi_payment_id TEXT UNIQUE,
      status TEXT DEFAULT 'pending',
      txid TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,
};
