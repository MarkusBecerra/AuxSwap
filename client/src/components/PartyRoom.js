import React from "react";
import NavBar from './navBar';
import { useState,useEffect,useLayoutEffect} from "react";
import ActiveBox from "./Party_components/activeBox"
import SearchBar from "./Party_components/SearchBar"
import SongQueue from "./Party_components/SongQueue"
import CurrentPlay from"./Party_components/CurrentPlay"
import useParty from "../hooks/useParty";

import "./PartyRoom.css"

import SpotifyWebApi from "spotify-web-api-node";
const sp = new SpotifyWebApi()

function PartyRoom(props){
    
    
    const {roomId} = props.match.params;
    const [spotifyApi,setAPi]=useState(sp)
    const [member,setmember] = useState()
    const [localsongList,setSonglist] = useState([])
    const [localSDK,setSDK]=useState()
    const  party= useParty({room:roomId,spotify:spotifyApi,setAPi});
    //console.log(localsongList)
    function handleSongSend(song){
        party.sendSong(song)
    }
    useLayoutEffect(()=>{
        if(!window.onSpotifyWebPlaybackSDKReady().SDK_object) return
        setSDK(window.onSpotifyWebPlaybackSDKReady().SDK_object)
    })
   
    useEffect(()=>{
        if(!party.songList) return
        setSonglist(party.songList)
        party.peakTop()
    },[party.songList])
   
    useEffect(()=>{
        setmember(party.memberlist)
    },[party.memberlist])
    useEffect(()=>{
        if(!party.currentSong) return
        if(!localSDK) return
        localSDK.getCurrentState().then(state=>{
            if(!state){
                party.SDKPlay(party.currentSong.songUrl)
                return
            }
            if(state.track_window.current_track.uri!=party.currentSong.songUrl)
            {
                party.SDKPlay(party.currentSong.songUrl)
                return
            }
        })
    },[party.currentSong])
    useEffect(()=>{
        if(!localSDK) return
        const interv=setInterval(()=>{
            localSDK.getCurrentState().then(state=>{
                if(!state) return
                console.log(state)
                if(state.paused==true)
                {
                    if(localsongList.length>0)
                    {
                        party.nextSong()
                    }
                    
                }
            })
        },1000)
        return ()=>{
            clearInterval(interv)
        }
    })
   
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
            </div>
        </div>

    )
}

export default PartyRoom;