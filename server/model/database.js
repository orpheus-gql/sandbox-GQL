const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_HOST,
})

pool.connect((err) => {
  if (err) return console.error('could not connect to postgres', err);
});

module.exports = pool;