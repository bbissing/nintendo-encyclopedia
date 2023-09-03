const { pool } = require("../db");

module.exports = {
  editReviewHandler: async (req, res) => {
    try {
      console.log('req body: ', req.body);
      let name = req.body.name;
      let review = req.body.review;
      let user = req.body.user;
      let id = req.body.id;

      const result = await pool.query(
        `UPDATE "my_reviews"
         SET "character_name" = $1, "review" = $2
         WHERE "user_id" = $3 AND "id" = $4`,
        [name, review, user, id]
      );

      console.log("Character review successfully changed.", result);
      res.status(201).end();
    } catch (error) {
      console.error(error);
      res.status(400).send({
        message:'Could not edit review.'
      });
    }
  }
}