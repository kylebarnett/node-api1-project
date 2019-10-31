import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users')
      .then(res => setUsers(res.data)
      )
      .catch(err => {
        console.log(err)
      }, [])
  })
  // const deleteMe = id => {
  //   axios
  //     .delete(`http://localhost:8000/api/users/${id}`)
  //     .then(res => setUsers(res.data))
  // }
  return (
    <div className="App">
      {users.map(user => (
        <div key={user.id}>
          <div>{user.name}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
