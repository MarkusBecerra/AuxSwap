import {useEffect,useContext,useState} from 'react'
import Script from 'react-load-script'
import TokenContext from '../TokenContext';

export default function Player() {
    
    const context = useContext(TokenContext)
    const [SDK,setSDK]=useState()
    const [DeviceID,setDevice]=useState()
   
    useEffect(()=>{
        window.onSpotifyWebPlaybackSDKReady=()=>{
           return {SDK_object:SDK,SDK_ID:DeviceID}
        }
    })
    
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
