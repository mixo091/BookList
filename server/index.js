//The standars.
require('dotenv').config();
const db = require('./db/db.js');
const express = require('express');
const app = express();

const BookModel = require('./models/books.js');
const { default: mongoose } = require('mongoose');


//Server starts to listen..
const PORT = process.env.PORT;


app.get('/hello' , (req , res) => {
    console.log('Hitted');
    res.status(200).send('Hello My friend');
})


const helloJson = {'message':'hello'};
app.get('/helloJSON' , (req,res) => {
    console.log('Hitted');
    res.status(200).send(helloJson);
})

app.get('/helloJSON1' , (req,res) => {
    console.log('Hitted');
    res.status(200).json(helloJson);
})


;
app.get('/helloHTML' , (req,res) => {
    console.log('Hitted');
    res.status(200).send('<h1>Hello my fried </h1> <ul><li>jonas</li> <li>michael</h1> </ul>');
})




// add a new book

const bookToInsert = {
    title:'Harry Potter',
    pages:389,
    author:'J.K Rowling',
    description: 'The adventure of a young magician'
}

app.get('/insert-book' , async (req,res) => {
    const book = new BookModel(bookToInsert)
    await book.save();
    res.send('A BOOK was inserted');
})

app.get('/read', async (req, res) => {
    try {
      // Find all users
      const books = await  BookModel.find({});
      console.log('Found books:', books);
      res.status(200).json(books);
    } catch (err) {
      console.error('Error finding books:', err);
      res.status(500).send('Internal Server Error');
    }
  });


  app.get('/read/pages/300', async (req, res) => {
    try {
      // Find books with more than 300 pages
      const books = await BookModel.find({ pages: { $gt: 300 } });
      if (books.length === 0) {
        return res.status(404).json({ error: 'No books found with more than 300 pages' });
      }
      console.log('Found books with more than 300 pages:', books);
      res.status(200).json(books);
    } catch (err) {
      console.error('Error finding books with more than 300 pages:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/read/:id', async (req, res) => {
    const id = req.params.id;
    try {
      // Find the book with the specified ID
      const book = await BookModel.findById(id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      console.log('Found book:', book);
      res.status(200).json(book);
    } catch (err) {
      console.error('Error finding book:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/read/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
      // Find the book with the specified title
      const book = await BookModel.findOne({ title });
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      console.log('Found book:', book);
      res.status(200).json(book);
    } catch (err) {
      console.error('Error finding book:', err);
      res.status(500).send('Internal Server Error');
    }
  });

function Server(){
    db();
    app.listen(PORT, ()=>{
        console.log('==================================');
        console.log(`Server is listening on port ${PORT}..`);
        console.log('==================================');
        
    });
}

Server();
