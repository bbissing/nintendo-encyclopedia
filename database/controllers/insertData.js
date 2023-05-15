const { pool } = require("../db");

module.exports = {
  postReviewHandler: async (name, review, image) => {
    try {
      const result = await pool.query(
        "INSERT INTO my_reviews (character_name, review, thumbnail_url) VALUES ($1, $2, $3)",
        [name, review, image]
      );
      console.log(`Added a character with the name ${name}`);
    } catch (error) {
      console.error(error)
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