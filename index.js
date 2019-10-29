// implement your API here
const express = require('express'); //importing the express library similar to the FE method of doing it
const db = require('./data/db'); //importing the necessary database file

const server = express(); //creates the server

//middleware
server.use(express.json()); //teaches express how to read JSON--needed for post and put to work
const port = 8000; // creating a port variable to listen for

server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.json(users)
  }).catch(err => {
    res.status(500).json({ error: "Users information could not be retrieved." })
  })
})

server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  console.log("test", userInfo)
  db.insert(userInfo).then(user => {
    res.json(user)
  }).catch(err => {
    res.status(500).json({ error: "User information could not be posted." })
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})


