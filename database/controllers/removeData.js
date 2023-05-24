const { pool } = require("../db");

module.exports = {
  deleteReviewHandler: async (req, res) => {
    try {
      console.log('req.body: ', req.body);
      if (req.body.name !== undefined) {
        const name = req.body.name;
        console.log('req: ', req);
        console.log('name: ', name);

        const result = await pool.query(
          "DELETE FROM my_reviews WHERE character_name = ($1)",
          [name]
        );

        console.log(`Succesfully deleted value from my_reviews.`);
        res.status(204).end()
      } else {
        const id = req.body.id;
        console.log('req: ', req);
        console.log('id: ', id);

        const result = await pool.query(
          "DELETE FROM my_reviews WHERE id = ($1)",
          [id]
        );

        console.log(`Succesfully deleted value from my_reviews.`);
        res.status(204).end()
      }
    } catch (error) {
      console.error(error);
      res.status(400).send({
        message: 'Review could not be deleted'
      });
    }
  }
}