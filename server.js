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
      const bookArrayLimit10 = [];
      for(let i = 0; i < 10; i++) {
        bookArrayLimit10.push(bookArray[i]);
      }
      return bookArrayLimit10;
    })
    .then(
      books => {
        //console.log('bookArray is: ', bookArray);
        response.render('pages/searches/show', {bookList: books});
      })
    .catch (
      // error => console.log('An error occurs from createSearch: ', error)
      error => {
        // console.log('My-error: ', error);
        response.render('pages/error', {errorMsg: error});
      });
}


function Book (book) {
  this.title = book.volumeInfo.title || 'No book title found.';
  this.author = book.volumeInfo.authors[0] || 'No author found.'; //maybe multiple authors
  this.description = book.volumeInfo.description || 'No description found.';
  this.img_url = book.volumeInfo.imageLinks.thumbnail || 'No image found.';
}






app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));









