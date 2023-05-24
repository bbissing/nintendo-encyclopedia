const { pool } = require("../db");
const { getReviewHandler, retrieveUser } = require('../controllers/retrieveData.js');

module.exports = {
  // postReviewHandler: async (name, review, image, user, char) => {
  //   try {
  //     // const reviews = await getReviewHandler(user);
  //     // console.log('reviews: ', reviews);

  //     // if (reviews.rows.length !== 0) {
  //     //   if (reviews.rows[0].char_id === char || reviews.rows[0].character_name === name) {
  //     //     throw new Error('Character already exists in your reviews');
  //     //   }
  //     // }

  //     const result = await pool.query(
  //       "INSERT INTO my_reviews (character_name, review, thumbnail_url, user_id, char_id) VALUES ($1, $2, $3, $4, $5)",
  //       [name, review, image, user, char]
  //     );

  //     console.log(`Added a character with the name ${name}`);
  //   } catch (error) {
  //     console.error(error);
  //     return error;
  //   }
  // },

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

  // createUser: async (username, email, password) => {
  //   try {
  //     const result = await pool.query(
  //       "INSERT INTO users (username, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')))",
  //       [username, email, password]
  //     );
  //     console.log(`Added a character with the username ${username}`);
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
}

// async function insertData() {
//   const [name, review] = process.argv.slice(2);
//   try {
//     const res = await pool.query(
//       "INSERT INTO my_reviews (character_name, review) VALUES ($1, $2)",
//       [name, review]
//     );
//     console.log(`Added a character with the name ${name}`);
//   } catch (error) {
//     console.error(error)
//   }
// }

// insertData();