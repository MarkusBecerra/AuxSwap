// Import necessary pacakges
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const db = require('./utils/queries');

// parsing body parameters
app.use(bodyParser.json());

// Get main site
app.get('/', (req, res, next) => {
    res.send('Mainpage');
});

// Get all users
app.get('/users', db.getUser);

// Get a user by his/her id 
app.get('/users/:id', db.getUserById);

// add a new user
app.post('/users', db.addUser);

// update an existing user
app.put('/users/:id', db.updateUser);

// remove an existing user
app.delete('/users/:id', db.removeUser);


// Start server listening
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})