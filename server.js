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


app.post('/searches', createSearch);

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)

    .then(result => {
      const bookArray = result.body.items.map(book => new Book(book));
      return bookArray;
    })
    .then(
      bookArray => {
        console.log('bookArray is: ', bookArray);
        response.render('pages/searches/googleresult', {bookList: bookArray});
      })
    .catch (error => console.log('An error occurs from createSearch: ', error));
}


function Book (bookfun) {
  this.title= bookfun.volumeInfo.title;
  this.author=bookfun.volumeInfo.authors[0] || 'No author found'; //maybe multiple authors
  this.year_published= bookfun.volumeInfo.publishedDate;
  this.img_url= bookfun.volumeInfo.imageLinks.thumbnail || 'No author found';
}






app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));









