const { pool } = require("../db");

module.exports = {
  deleteReviewHandler: async (req, res) => {
    try {
      console.log('req.body: ', req.body);
      if (req.body.charID !== undefined) {
        const charID = req.body.charID;
        console.log('req: ', req);
        console.log('charID: ', charID);

        const result = await pool.query(
          "DELETE FROM my_reviews WHERE char_id = ($1)",
          [charID]
        );
        console.log('result: ', result);
        console.log(`Succesfully deleted value from my_reviews.`);
        res.status(204).end();
      } else {
        const id = req.body.id;

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