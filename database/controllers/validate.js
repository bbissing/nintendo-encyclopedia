const { pool } = require("../db");

module.exports = {
  validate: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(400).end();
    }
  }

  //   try {
  //     const result = await pool.query(
  //       "SELECT id, username, email, password FROM users WHERE email = ($1) AND password = crypt($2, password)",
  //       [email, password]
  //     );
  //     if (result.rows.length === 0) {
  //       throw new Error('Could not retrieve user. Either user does not exist or the password was incorrect');
  //     } else {
  //       console.log('req.session: ', req.session);
  //       if (req.session !== undefined) {
  //         req.session.user = {
  //           id: result.rows[0].id,
  //           username: result.rows[0].username
  //         }
  //         console.log('req.session.user: ', req.session.user);
  //       }
  //       res.status(200).send(result);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(400).send({
  //       message: error.message
  //     });
  //   }
  // }
}