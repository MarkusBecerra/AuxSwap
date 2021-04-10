const users =[];

const removeUser =(id)=>{
    const index = users.findIndex((user)=>user.id===id);
    if(index !== -1){
        return users.splice(index,1)[0];
    }
}
const getUser =(id) => users.find((user)=>user.id ===id);
const addUser = ({id,name,data,room})=>{
    const playlist=[]
    const user={id,name,data,room,playlist}
    users.push(user)
    return user
}
const getUsersInRoom =(room)=> users.filter((user)=>user.room ===room)
const setPlaylist=(obj)=>{
    const currentUser=getUser(obj.id)
    const room=currentUser.room
    users.map((user)=>{
        if(user.room==room)
        {
            user.playlist.push(obj.song)
        }
    })
}
const getPlaylist=(id)=>{
    const index=users.findIndex((user)=>user.id==id);
    if(index !=-1){
        return users[index].playlist
    }
}
const updateplaylist=(id)=>{
    const currentUser=getUser(id)
    const room =currentUser.room
    
    users.map((user)=>{
        if(user.room==room && user.id != currentUser.id)
        {
            user.playlist.map((song)=>currentUser.playlist.push(song));
        }
    })
}

const PeakPlaylist=(id)=>{
    const currentUser=getUser(id)
    //console.log(currentUser.playlist[0])
    return currentUser.playlist[0]
}
const PopPlaylist=(id)=>{
    const user=getUser(id)
    user.playlist.shift()
    console.log(user.playlist)
}
module.exports = {addUser,removeUser,getUsersInRoom,getUser,setPlaylist,getPlaylist,updateplaylist,PeakPlaylist,PopPlaylist}