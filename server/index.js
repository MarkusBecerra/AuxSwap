// Import necessary pacakges
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const db1 = require('./utils/users');
const db2 = require('./utils/messages');

// parsing body parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

// Get main site
app.get('/', (req, res, next) => {
    res.send('Mainpage');
});

// Get all users
app.get('/users', db1.getUser);

// Get a user by his/her id 
app.get('/users/:id', db1.getUserById);

// add a new user
app.post('/users', db1.addUser);

// update an existing user
app.put('/users/:id', db1.updateUser);

// remove an existing user
app.delete('/users/:id', db1.removeUser);

// Get chat history by session_id
app.get('/messages/:id', db2.getMessageById);

// Add a piece of message by session_id
app.post('/messages/:id', db2.addMessage);

// Start server listening
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})