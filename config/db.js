require('dotenv').config();
module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PORT: process.env.DB_PORT || 5432,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME || "fitness-db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    match: [/Deadlock/i], // Match all error messages matching specified expressions
    max: process.env.RETRY_MAX || 3, // Maximum rety 3 times
    backoffBase: process.env.RETRY_BACK_OFF_BASE || 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: process.env.RETRY_BACK_OFF_EXPONENT || 1.5, // Exponent to increase backoff each try. Default: 1.1
  },
  logging: process.env.DB_QUERY_LEVEL,
};
// postgresql://postgres@localhost:5432/fitness-db?schema=public