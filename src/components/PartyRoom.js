import React from "react";
import NavBar from './navBar';
import { useState,useEffect} from "react";

import useParty from "../hooks/useParty";

import SpotifyWebApi from "spotify-web-api-js";
const sp = new SpotifyWebApi()

function PartyRoom(props){
    
    
    const {roomId} = props.match.params;
    const [spotifyApi,setAPi]=useState(sp)
    const [member,setmember] = useState()
    const  party= useParty({room:roomId,spotify:spotifyApi,setAPi});
    
   
    useEffect(()=>{
        setmember(party.memberlist)
    },[party.memberlist])
    return(
        <div>
            <NavBar/>
            <div className="party-room-container">
                <h1 className="party-room-title">Party room</h1>
                <h2 className="room-name" >Room: {roomId}</h2>
                <div className="user-container">
                 {member ? member.map(({name,data,id})=>(
                     <div key={id}>
                         {name}
                         <img src={data}></img>
                     </div>
                 )):null}
                </div>

            </div>
        </div>

    )
}

export default PartyRoom;