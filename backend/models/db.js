import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('PostgreSQL connection error', err);
    process.exit(1);
  }
};

export default connectDB;
export { pool };
