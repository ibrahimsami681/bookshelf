//const { response } = require('express');
const express = require('express');
//const { request } = require('http');
const app = express();
const path = require('path');
const methodOverride = require("method-override")


const Book = require('./models/book')


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO connection established");
    })
    .catch((err) => {
        console.log("An error has occured", err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//view all products in database
app.get("/books", async (req, res) => {
    const books = await Book.find({})
    console.log(books);
    res.render('books/index', { books });
})

//serves the from
app.get("/books/new", (req, res) => {
    res.render('books/new');
})

app.post("/books", async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    /*  console.log(req.body);
     res.send("Loading... Book is being added to list"); */
    res.redirect(`/books/${newBook._id}`); //=>redirect to show page
    //res.redirect("/books"); //=>redirects to home page
})

//more information on book with the id
app.get("/books/:id", async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render('books/show', { book });
    //console.log(book);
})

app.get("/books/:id/edit", async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render('books/edit', { book });
})

app.put("/books/:id", async (req, res) => {
    //update the product with content in from
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { runValidators: true })
    res.redirect(`/books/${id}`)
})

app.delete("/books/:id", async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndRemove(id);
    res.redirect("/books");
})

app.listen(3000, () => {
    console.log("Server Listening onPort 3000!!")
})