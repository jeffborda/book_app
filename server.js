'use strict';

const express = require('express');
const superagent = require('superagent');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (request, response) => {
  response.render('pages/index');
})


app.get('/hello', (request, response) => {
  response.render('pages/index');
})




// app.get('/hello');

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));









