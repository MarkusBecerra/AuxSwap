const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const {addUser,removeUser,getUsersInRoom,getUser} =require('./users.js')
const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const Join_event = "newJoin"
const Get_allUser="Get_users"
const Get_room_data = "get_room_data"
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
  });
  //listen for get data
  
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

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});