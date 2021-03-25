import React from "react";
import NavBar from './navBar';
import { useState,useEffect} from "react";
import ActiveBox from "./Party_components/activeBox"
import SearchBar from "./Party_components/SearchBar"
import SongQueue from "./Party_components/SongQueue"
import useParty from "../hooks/useParty";
import SpotifyWebApi from "spotify-web-api-node";
const sp = new SpotifyWebApi()

function PartyRoom(props){
    
    
    const {roomId} = props.match.params;
    const [spotifyApi,setAPi]=useState(sp)
    const [member,setmember] = useState()
    const [localsongList,setSonglist] = useState([])
    const  party= useParty({room:roomId,spotify:spotifyApi,setAPi});
    //console.log(localsongList)
    function handleSongSend(song){
        party.sendSong(song)
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
            <NavBar/>
            <div className="party-room-container">
                <h1 className="party-room-title">Party room</h1>
                <h2 className="room-name" >Room: {roomId}</h2>
                <div className="user-container">
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
            </div>
        </div>

    )
}

export default PartyRoom;