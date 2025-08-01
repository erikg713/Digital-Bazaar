export const UserModel = {
  createTable: `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      pi_uid TEXT UNIQUE,
      username TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,
};
