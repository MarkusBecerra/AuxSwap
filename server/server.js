const app= require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = require("http").Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const auth = require('./auth');
app.use(cookieParser());
  app.use(
    bodyParser.json({
      limit: 1024
    })
  );


app.use('/auth',auth);
const port = process.env.PORT || 4000;
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

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});