require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({extended: true}));

// app.get('/search_character')

// ---- Catch all for routing ---- //

app.get('/test', function(req, res) {
  res.send('this is the third test');
});

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