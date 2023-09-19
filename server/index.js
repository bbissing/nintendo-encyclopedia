require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const axios = require('axios');
const PORT = 3000;
const db = require('../database/db');
const { postReviewHandler, createUser } = require('../database/controllers/insertData.js');
const { getReviewHandler, retrieveUser } = require('../database/controllers/retrieveData.js');
const { validate } = require('../database/controllers/validate.js');
const { deleteReviewHandler } = require('../database/controllers/removeData.js');
const { editReviewHandler } = require('../database/controllers/editData.js');

const sessionConfig = {
  name: 'lets-a-go',
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 5,
    // maxAge: 1000 * 60 * 2,
    secure: false, // for production, set secure to true for https only access
    httpOnly: true // true mean no access from JS
  },
  resave: false,
  saveUninitialized: true // switch to false for production (GDPR laws)
}

app.use(express.json());
app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({extended: true}));

app.get('/get-character', async (req, res) => {
  const response = await axios.get(`https://www.giantbomb.com/api/character/${req.query.query}/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=name,image,deck`);
  res.send(response.data.results);
});

app.get('/get-games', async (req, res) => {
  const allGames = [];
  let games = await axios.get(`https://www.giantbomb.com/api/character/${req.query.query}/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=games`);
  games = games.data.results.games;
  await Promise.all(games.map(async (game, index) => {
    if (index <= 24) {
      let response = await axios.get(`${game.api_detail_url}?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=name,image,deck`);
      allGames.push(response.data.results);
    }
  }))

  res.send(allGames);
});

app.post('/post-review', postReviewHandler);

app.post('/create-user', createUser);

app.get('/get-reviews', async (req, res) => {
  let userId = req.query.userId;
  let response = await getReviewHandler(userId);
  res.send(response);
});

app.post('/retrieve-user', retrieveUser);

app.get('/validate', validate);

app.post('/delete-review', deleteReviewHandler);

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
})

app.put('/edit-review', editReviewHandler);

// ---- Catch all for routing ---- //

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Listening on http://localhost:${PORT}`);
});