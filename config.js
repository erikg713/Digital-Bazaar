import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000,

  // PostgreSQL connection config
  pg: {
    user: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'yourdbname',
    password: process.env.PG_PASSWORD || '',
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
  },

  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;

