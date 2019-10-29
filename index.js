// implement your API here
const express = require('express'); //importing the express library similar to the FE method of doing it
const db = require('./data/db'); //importing the necessary database file

const server = express(); //creates the server
const port = 8000; // creating a port variable to listen for

server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.json(users)
  }).catch(err => {
    res.json({error: "Users information could not be retrieved."})
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})


