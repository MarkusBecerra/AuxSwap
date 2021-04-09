const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
//const db1 = require('./utils/users');
//const db2 = require('./utils/messages');
const db3 = require('./utils/chatroom');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  },
});
//const {addUser,removeUser,getUsersInRoom,getUser,setPlaylist,getPlaylist,updateplaylist,PeakPlsylist,PopPlaylist} =require('./users.js')
const auth = require('./auth');
app.use(cookieParser());
  app.use(
    bodyParser.json({
      limit: 1024
    })
  );
const corsOptions = {
    origin: '*', //Frontend url
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
// const Join_event = "newJoin"

// const Get_room_data = "get_room_data"
// const SS_event="song_send"
// const Get_topList="get_top_list"
// const next_song = "get_next"

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});


// Start server listening
server.listen(PORT, () => {
  console.log(`App is Listening on port ${PORT}`);
});

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

});


// Get chat history by session_id
app.get('/chat/:id', cors(corsOptions), db3.getChatById);

// Add a piece of message by session_id
app.post('/chat', cors(corsOptions), db3.addChatMessage);