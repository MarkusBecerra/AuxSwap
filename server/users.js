const users =[];

const removeUser =(id)=>{
    const index = users.findIndex((user)=>user.id===id);
    if(index !== -1){
        return users.splice(index,1)[0];
    }
}
const getUser =(id) => users.find((user)=>user.id ===id);
const addUser = ({id,name,data,room})=>{
    const user={id,name,data,room}
    users.push(user)
    return user
}
const getUsersInRoom =(room)=> users.filter((user)=>user.room ===room)

module.exports = {addUser,removeUser,getUsersInRoom,getUser}