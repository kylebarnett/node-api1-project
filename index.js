// implement your API here
const express = require('express'); //importing the express library similar to the FE method of doing it
const db = require('./data/db'); //importing the necessary database file

const server = express(); //creates the server

//middleware
server.use(express.json()); //teaches express how to read JSON--needed for post and put to work
const port = 8000; // creating a port variable to listen for

//GET METHODS
server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.json(users)
  }).catch(err => {
    res.status(500).json({ error: "Users information could not be retrieved." })
  })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.findById(id)
    .then(userID => {
      if (userID) {
        res.json(userID)
      } else {
        res.status(404).json({ error: "The user with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be found." })
    })
})

//POST METHODS
server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  console.log("test", userInfo)
  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({ error: "Please provide name and bio for the user!" })
  }
  db.insert(userInfo).then(user => {
    res.status(201).json(user)
  }).catch(err => {
    res.status(500).json({ error: "User information could not be posted." })
  })
})

//PUT METHODS
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params
  const userInfo = req.body;
  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({ error: "Please provide name and bio for the user!" })
  }
  db.update(id, userInfo)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated)
      } else {
        res.status(404).json({ error: "The user with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be modified." })
    })
})

//DELETE METHODS
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id).
    then(user => {
      if (user) {
        res.status(201).json(user)
      } else {
        res.status(404).json({ error: "The user with the specified ID does not exist." })
      }
    }).catch(err => {
      res.status(500).json({ error: "User could not be deleted." })
    })
})
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})


