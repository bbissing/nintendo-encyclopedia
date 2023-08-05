const { pool } = require("../db");
const { getReviewHandler, retrieveUser } = require('../controllers/retrieveData.js');

module.exports = {
  postReviewHandler: async (req, res) => {
    try {
      console.log('req body: ', req.body);
      let name = req.body.name;
      let review = req.body.review;
      let image = req.body.image;
      let user = req.body.user;
      let char = req.body.char;

      const result = await pool.query(
        "INSERT INTO my_reviews (character_name, review, thumbnail_url, user_id, char_id) VALUES ($1, $2, $3, $4, $5)",
        [name, review, image, user, char]
      );

      console.log(`Added a character with the name ${name}`);
      res.status(201).end();
    } catch (error) {
      console.error(error);
      res.status(400).send({
        message:'A review for this character already exists.'
      });
    }
  },

  createUser: async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    try {
      const result = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')))",
        [username, email, password]
      );
      console.log(`Added a character with the username ${username}`);
      res.status(201).end();
    } catch (error) {
      console.error(error);
      res.status(400).send({
        message:'Username already exists/email has been taken'
      });
    }
  }
}