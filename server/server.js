const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = require("http").Server(app);
const cors = require('cors');
const db1 = require('./utils/users');
const db2 = require('./utils/messages');
const db3 = require('./utils/chatroom');
const db4 = require('./utils/chat');

const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
const auth = require('./auth');
app.use(cookieParser());
  app.use(
    bodyParser.json({
      limit: 1024
    })
  );
const corsOptions = {
    origin: 'http://localhost:3000', //Frontend url
}

// Setting up server requirement
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cors(corsOptions));
app.use('/auth',auth);
const PORT = process.env.PORT || 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});

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

// Get chat history by session_id
app.get('/chat/:id', cors(corsOptions), db3.getChatById);

// Add a piece of message by session_id
app.post('/chat', cors(corsOptions), db3.addChatMessage);

// Get session by userID
app.get('/session/:user', cors(corsOptions), db4.getSessionByUser);

// Add one session
app.post('/session', cors(corsOptions), db4.createSession);

// Add two sessions
app.post('/sessions', cors(corsOptions), db4.createTwoSession);

// Start server listening
server.listen(PORT, () => {
  console.log(`App is Listening on port ${PORT}`);
});