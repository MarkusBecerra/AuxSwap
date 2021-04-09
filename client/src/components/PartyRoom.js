import React from "react";
import NavBar from './navBar';
import { useState,useEffect} from "react";
import ActiveBox from "./Party_components/activeBox"
import SearchBar from "./Party_components/SearchBar"
import SongQueue from "./Party_components/SongQueue"
import CurrentPlay from"./Party_components/CurrentPlay"
import useParty from "../hooks/useParty";
import Player from "./Party_components/Player"
import "./PartyRoom.css"

import SpotifyWebApi from "spotify-web-api-node";
const sp = new SpotifyWebApi()

function PartyRoom(props){
    
    
    const {roomId} = props.match.params;
    const [spotifyApi,setAPi]=useState(sp)
    const [member,setmember] = useState()
    const [localsongList,setSonglist] = useState([])
    const [deviceID,setDeviceID] = useState()
    const [playerOBJ,setPlayerObj]=useState()
    const  party= useParty({room:roomId,spotify:spotifyApi,setAPi,SDK:playerOBJ,ID:deviceID});
    //console.log(localsongList)
    function handleSongSend(song){
        party.sendSong(song)
    }
    function handleDeviceID(ID_num){
        setDeviceID(ID_num)
    }
    function handleSDK(obj){
        setPlayerObj(obj)
    }
   
    useEffect(()=>{
        if(!party.songList) return
        setSonglist(party.songList)
        
    },[party.songList])
   
    useEffect(()=>{
        setmember(party.memberlist)
    },[party.memberlist])
   
    return(
        <div>
            <div className="party-room-container">
                <h1 className="party-room-title">Party room</h1>
                <h2 className="party-room-name" >Room: {roomId}</h2>
                <div className="user-container">
                    <h3 className="user-title">Active Users</h3>
                <ActiveBox members={member}/>
                </div>
                <div className="Search-Bar">
                <SearchBar api={spotifyApi} handleSongSend={handleSongSend}/>
                </div>
                <div className="song-container">
                    {localsongList.map((song)=>
                        
                        (<SongQueue song={song} key={song.songUrl}/>)
                    )}
                
                </div>
               <Player handleID={handleDeviceID} SDK={handleSDK}/>
            </div>
        </div>

    )
}

export default PartyRoom;