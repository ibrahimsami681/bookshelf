//file to run anytime i wish to get new information from database
const Book = require('./models/book')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO connection established");
    })
    .catch((err) => {
        console.log("An error has occured", err);
    })

/*Option1- create each book(document)then save*/
const b = new Book({
    title: 'The Missing README: A Guide for the New Software Engineer',
    author: ' Chris Riccomini and Dmitriy Ryaboy',
    price: 27.99,
    category: "NonFiction"
})

b.save()
    .then(() => {
        console.log(b)
    })
    .catch(e => {
        console.log(e);
    })
/*End of Option1*/

/*Option2 - use the insertMany specifying an array of books(document)*/
//in mongoose if everything doesnt pass validation nothing is added when using insertMany
const arr = [
    {
        title: 'ICE WALKER',
        author: 'James Raffan',
        price: 27.99,
        category: "NonFiction"
    },
    {
        title: 'Sugar Falls',
        author: 'David A. Robertson',
        price: 27.99,
        category: "NonFiction"
    },
    {
        title: 'Not Dark Yet',
        author: 'Peter Robinson',
        price: 27.99,
        category: "Thriller"
    },
    {
        title: 'Five Little Indians',
        author: 'Michelle Good',
        price: 27.99,
        category: "Fiction"
    },
    {
        title: 'Home of the Floating Lily',
        author: 'Silmy Abdullah',
        price: 27.99,
        category: "Fantasy"
    }
]

Book.insertMany(arr)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })