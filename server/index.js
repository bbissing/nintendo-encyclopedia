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

const sessionConfig = {
  name: 'lets-a-go',
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60,
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

// console.log('sessionConfig: ', sessionConfig);

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

app.post('/post-review', postReviewHandler);

// app.post('/post-review', async (req, res) => {
//   let name = req.body.name;
//   let review = req.body.review;
//   let image = req.body.image;
//   let user = req.body.user;
//   let char = req.body.char;
//   // console.log('request', req);
//   // let image = await axios.get(`https://www.giantbomb.com/api/character/${req.query.query}/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&field_list=name,image,deck`);
//   let response = await postReviewHandler(name, review, image, user, char);
//   if (response !== undefined) {
//     let error = response;
//     // console.log('/post-review - response - express: ', error.message);
//     res.status(400).send({
//       message: error.message
//     });
//   }
//   res.status(201).end();
// });

app.post('/create-user', createUser);

// app.post('/create-user', async (req, res) => {
//   let username = req.body.username;
//   let email = req.body.email;
//   let password = req.body.password;
//   let response = await createUser(username, email, password);
//   res.status(201).end();
// });

app.get('/get-reviews', async (req, res) => {
  let userId = req.query.userId;
  // console.log('/get-reviews - userId: ', userId);
  let response = await getReviewHandler(userId);
  res.send(response);
});

app.post('/retrieve-user', retrieveUser);

// app.post('/retrieve-user', async (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   let response = await retrieveUser(email, password);
//   res.status(201).send(response);
// });

app.get('/validate', validate);

app.post('/delete-review', deleteReviewHandler);

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
})

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