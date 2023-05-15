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
  },

  // retrieveUser: async (email, password) => {
  //   try {
  //     const result = await pool.query(
  //       "SELECT email, password FROM users WHERE email = ($1) AND password = crypt($2, password)",
  //       [email, password]
  //     );
  //     console.log('result: ', result);
  //     if (result.rows.length === 0) {
  //       throw new Error('Could not retrieve user. Either user does not exist or the password was incorrect');
  //     } else {
  //       return result;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  retrieveUser: async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    try {
      const result = await pool.query(
        "SELECT email, password FROM users WHERE email = ($1) AND password = crypt($2, password)",
        [email, password]
      );
      if (result.rows.length === 0) {
        throw new Error('Could not retrieve user. Either user does not exist or the password was incorrect');
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(error);
      res.status(400).send({
        message: error.message
      });
    }
  }
}