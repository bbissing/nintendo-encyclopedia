const { pool } = require("../db");

module.exports = {
  getReviewHandler: async (userId) => {
    try {
      const result = await pool.query(
        "SELECT id, character_name, review, thumbnail_url, user_id, char_id FROM my_reviews WHERE user_id = ($1)",
        [userId]
      );

      return result;
    } catch (error) {
      console.error(error);
    }
  },

  retrieveUser: async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    try {
      const result = await pool.query(
        "SELECT id, username, email, password FROM users WHERE email = ($1) AND password = crypt($2, password)",
        [email, password]
      );

      if (result.rows.length === 0) {
        throw new Error('Could not retrieve user. Either user does not exist or the password was incorrect');
      } else {
        if (req.session !== undefined) {
          req.session.user = {
            id: result.rows[0].id,
            username: result.rows[0].username
          }
        }
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(400).send({
        message: error.message
      });
    }
  }
}