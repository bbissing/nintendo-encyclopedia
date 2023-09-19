const { pool } = require("../db");

module.exports = {
  validate: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(400).end();
    }
  }
}