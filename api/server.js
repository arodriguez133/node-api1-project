// BUILD YOUR SERVER HERE
const express = require('express');
const users = require('./users/model');
const server = express();

server.get('/api/users', (req, res)=> {
    console.log("Getting all users");
    res.send('working');
});

server.use('*', (req, res)=> {
    res.status(404).json({message: "not found"});
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
