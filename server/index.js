require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({extended: true}));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening on http://localhost:${PORT}`);
  // console.log('path: ', path.join(__dirname, '../client/dist'));
});