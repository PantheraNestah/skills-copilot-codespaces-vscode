//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Require model
const Comment = require('./models/comment');

//Require mongoose
const mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://localhost:27017/comment', { useNewUrlParser: true, useUnifiedTopology: true });

//Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Define the port
const port = 3000;

//Define the route
app.get('/', (req, res) => {
    res.send('Hello World');
});

//Get all the comments
app.get('/comments', (req, res) => {
    Comment.find((err, comments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(comments);
        }
    });
});

//Get comment by id
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(comment);
        }
    });
});

//Create a new comment
app.post('/comments', (req, res) => {
    const comment = new Comment({