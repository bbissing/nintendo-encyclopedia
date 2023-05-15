require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3000;
const db = require('../database/db');
const { postReviewHandler, createUser } = require('../database/controllers/insertData.js');
const { getReviewHandler, retrieveUser } = require('../database/controllers/retrieveData.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/get-character', async (req, res) => {
  const response = await axios.get(`https://www.giantbomb.com/api/character/${req.query.query}/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=name,image,deck`);
  res.send(response.data.results);
});

app.get('/get-games', async (req, res) => {
  const allGames = [];
  let games = await axios.get(`https://www.giantbomb.com/api/character/${req.query.query}/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=games`);
  games = games.data.results.games;
  // allGames.push(games);
  await Promise.all(games.map(async (game, index) => {
    if (index <= 24) {
      let response = await axios.get(`${game.api_detail_url}?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=name,image,deck`);
      allGames.push(response.data.results);
      // console.log('allGames:', allGames);
    }
    // let response = await axios.get(`${game.api_detail_url}?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=name,image,deck`);
    // allGames.push(response.data.results);
  }))

  res.send(allGames);
  // games.forEach(async (game, index) => {
  //   if (index < 3) {
  //     let response = await axios.get(`${game.api_detail_url}?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=name,image,deck`);
  //     allGames.push(response.data.results);
  //     console.log('allGames:', allGames);
  //   } else if (index === 3) {
  //     res.send(allGames);
  //   }
  // })
});

app.post('/post-review', async (req, res) => {
  let name = req.body.name;
  let review = req.body.review;
  let image = req.body.image;
  // console.log('request', req);
  // let image = await axios.get(`https://www.giantbomb.com/api/character/${req.query.query}/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=name,image,deck`);
  let response = await postReviewHandler(name, review, image);
  res.status(201).end();
});

app.post('/create-user', createUser);

// app.post('/create-user', async (req, res) => {
//   let username = req.body.username;
//   let email = req.body.email;
//   let password = req.body.password;
//   let response = await createUser(username, email, password);
//   res.status(201).end();
// });

app.get('/get-reviews', async (req, res) => {
  let results = [];
  let response = await getReviewHandler();
  res.send(response);
});

app.post('/retrieve-user', retrieveUser);

// app.post('/retrieve-user', async (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   let response = await retrieveUser(email, password);
//   res.status(201).send(response);
// });

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
  // console.log('path: ', path.join(__dirname, '../client/dist'));
});