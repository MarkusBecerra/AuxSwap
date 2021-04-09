import {useEffect,useState} from 'react'
import "./activeBox.css"
export default function ActiveBox(members) {
    const [usersInRoom,setUsers]=useState()
    useEffect(()=>{
        //console.log(members)
        setUsers(members.members)
    },[members])
    return (
        <div className="userContainer">
            {usersInRoom? usersInRoom.map(({name,data,id})=>(
                     <div className = "userBlock"key={id}>
                         <img src={data} className="userIcon"></img>
                         <div className="userName">{name}</div>
                     </div>
                 )):null}
        </div>
    )
}
