require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  database: 'character_reviews',
  password: '',
  port: 5432,
  host: 'localhost'
});

module.exports = { pool };