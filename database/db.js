require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: '',
  port: 5432,
  host: 'localhost'
});

const client = new Client({
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: '',
  port: 5432,
  host: 'localhost'
});

const execute = async (query) => {
  try {
      await client.connect();     // gets connection
      await client.query(query);  // sends queries
      return true;
  } catch (error) {
      console.error(error.stack);
      return false;
  } finally {
      await client.end();         // closes connection
  }
};

const text = `
  CREATE TABLE IF NOT EXISTS "my_reviews" (
    "id" SERIAL PRIMARY KEY,
    "character_name" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "user_id" INT
  );`;

execute(text).then(result => {
  if (result) {
      console.log('Table created');
  }
});

module.exports = { pool };