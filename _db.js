const { Pool } = require('pg');

// Supabase requiere SSL. La cadena de conexión completa viene en DATABASE_URL.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
