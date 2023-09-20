const { pool } = require("../db");

module.exports = {
  deleteReviewHandler: async (req, res) => {
    try {
      if (req.body.charID !== undefined) {
        const charID = req.body.charID;

        const result = await pool.query(
          "DELETE FROM my_reviews WHERE char_id = ($1)",
          [charID]
        );

        res.status(204).end();
      } else {
        const id = req.body.id;

        const result = await pool.query(
          "DELETE FROM my_reviews WHERE id = ($1)",
          [id]
        );

        res.status(204).end()
      }
    } catch (error) {
      res.status(400).send({
        message: 'Review could not be deleted'
      });
    }
  }
}