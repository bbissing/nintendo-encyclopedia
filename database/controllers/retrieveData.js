const { pool } = require("../db");

module.exports = {
  getReviewHandler: async () => {
    try {
      const result = await pool.query(
        "SELECT id, character_name, review, thumbnail_url FROM my_reviews"
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}