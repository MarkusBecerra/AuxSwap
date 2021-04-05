import {useEffect,useContext,useState} from 'react'
import Script from 'react-load-script'
import TokenContext from '../TokenContext';
import * as $ from "jquery";
export default function Player({partyOb}) {
    
    const context = useContext(TokenContext)
    var [SDK,setSDK]=useState()
    const [DeviceID,setDevice]=useState()
    
    useEffect(()=>{
        window.onSpotifyWebPlaybackSDKReady=()=>{
           return SDK
        }
    })
    
    useEffect(()=>{
        if(!partyOb)return
        if(!partyOb.songList) return
        console.log("changed in player")
        partyOb.peakTop()
    },[partyOb.songList])

    useEffect(()=>{
        if(!partyOb)return
        if(!partyOb.currentSong) return
        if(!SDK) return
        SDK.getCurrentState().then(state => {
            if(!state){
                SDKPlay(partyOb.currentSong.songUrl,DeviceID)
                return
            }
            if(state.track_window.current_track.uri!=partyOb.currentSong.songUrl)
            {
                SDKPlay(partyOb.currentSong.songUrl,DeviceID)
                return
            }
            
        })
        
    },[partyOb.currentSong])

    useEffect(()=>{
        if(!SDK) return
        if(!partyOb) return
        if(!partyOb.currentSong) return
        const interv=setInterval(()=>{
            SDK.getCurrentState().then(state => {
                if(!state) return
                
                if(state.paused==true){
                    partyOb.nextSong()
                    return
                }
            })
        },1000)

        return ()=>{
            clearInterval(interv)
            
        }
    })

    

    function SDKPlay(songUrl,device_id){
        $.ajax({
            url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
            type: "PUT",
            data: '{"uris": ["'+songUrl+'"]}',
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + context.currtoken );},
            
           });
    }
    
    function handleLoad(){
        const player = new window.Spotify.Player({
            name:'Aux2',
            getOAuthToken: cb=>{cb(context.currtoken);}
        })
        //console.log(player)
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        //player.addListener('player_state_changed', state => { console.log(state);  });

    // Ready
        player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDevice(device_id)
        });
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        });
        player.connect()
        setSDK(player)
        
    }
    return (
        <div>
            <Script 
                url="https://sdk.scdn.co/spotify-player.js" 
                onLoad={handleLoad}
                />
        </div>
    )
}
