require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3000;


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
  allGames.push(games);
  // const games = response.data.results.games;
  // games.forEach(game => {

  // })
  res.send(allGames);
});

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