// Import necessary pacakges
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db1 = require('./utils/users');
const db2 = require('./utils/messages');

const app = express();
const PORT = 4000;
const corsOptions = {
    origin: 'http://localhost:3000', //Frontend url
}

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
app.get('/users', cors(corsOptions), db1.getUser);

// Get a user by his/her id 
app.get('/users/:id', cors(corsOptions), db1.getUserById);

// add a new user
app.post('/users', cors(corsOptions), db1.addUser);

// update an existing user
app.put('/users/:id', cors(corsOptions), db1.updateUser);

// remove an existing user
app.delete('/users/:id', cors(corsOptions), db1.removeUser);

// Get chat history by session_id
app.get('/messages/:id', cors(corsOptions), db2.getMessageById);

// Add a piece of message by session_id
app.post('/messages/:id', cors(corsOptions), db2.addMessage);

// Start server listening
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})