const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = require("http").Server(app);
const cors = require('cors');
const db1 = require('./utils/users');
const db2 = require('./utils/messages');
const db3 = require('./utils/chatroom');

const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
const {addUser,removeUser,getUsersInRoom,getUser,setPlaylist,getPlaylist,updateplaylist,PeakPlsylist,PopPlaylist} =require('./users.js')
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
const Join_event = "newJoin"

const Get_room_data = "get_room_data"
const SS_event="song_send"
const Get_topList="get_top_list"
const next_song = "get_next"
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  if (roomId !=undefined)
    {socket.join(roomId);}


  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  //Listen for join party meessages
  socket.on(Join_event,({name,data,room})=>{
     const user=addUser({id:socket.id,name,data,room:room})

     socket.join(user.room)
     io.to(user.room).emit(Get_room_data,{room:user.room,users:getUsersInRoom(user.room)})
     updateplaylist(user.id)
     io.to(user.room).emit(SS_event,{room:user.room,songs:getPlaylist(user.id)})
  });
  //listen for song data
  socket.on(SS_event,({song})=>{
      const user=getUser(socket.id)
      setPlaylist({id:socket.id,song:song})
      io.to(user.room).emit(SS_event,{room:user.room,songs:getPlaylist(user.id)})
  });
  socket.on(Get_topList,()=>{
    const user=getUser(socket.id)
    io.to(user.room).emit(Get_topList,{room:user.room,song:PeakPlsylist(user.id)})
  });
  socket.on(next_song,()=>{
    const user=getUser(socket.id)

    PopPlaylist(user.id)
  })
  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    if(roomId == undefined)
    {
      const user=getUser(socket.id)
      removeUser(user.id)
      socket.leave(user.room)
      io.to(user.room).emit(Get_room_data,{room:user.room,users:getUsersInRoom(user.room)})
      //console.log(user.name,'left the party')
    }
    else
    {
      socket.leave(roomId);
    }

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

// Start server listening
server.listen(PORT, () => {
  console.log(`App is Listening on port ${PORT}`);
});
