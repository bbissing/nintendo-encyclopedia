const { pool } = require("../db");

async function insertData() {
  const [name, review] = process.argv.slice(2);
  try {
    const res = await pool.query(
      "INSERT INTO my_reviews (character_name, review) VALUES ($1, $2)",
      [name, review]
    );
    console.log(`Added a character with the name ${name}`);
  } catch (error) {
    console.error(error)
  }
}

insertData();