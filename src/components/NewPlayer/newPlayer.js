import {React,useEffect,useState,useContext} from 'react';
import useScript from '.../hooks/useScript';
import'./newPlayer.css';
import TokenContext from '../TokenContext';
import SpotifyWebApi from 'spotify-web-api-js';

let spotifyApi = new SpotifyWebApi();
let player = null;

function convertMsToMMSS(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}


const NewPlayer=(props)=>{
   const[songID, setSongID] = useState('');
   const[songTitle,setSongTitle] = useState('');
   const[songArtist,setSongArtist] = useState('');
   const[songImageURL,setImageURL]= useState('');
   const[songLengthMS,setSongLengthMS]=useState(10000);
   const[songCurrentMS,setSongCurrentMS] =useState(0);
   const[interval,setInterval] =useState(null);
   const[songIDs,setSongIDs] = useState(props.songIDs);
   const context = useContext(TokenContext);
   const[songIndex, setSongIndex]= useState(0);
   const[songIndexMax,setSongIndexMax]=useState(props.songIDs.length -1);
   useScript('https://sdk.scdn.co/spotify-player.js');
   useEffect(()=>{
       window.onSpotifyWebPlaybackSDKReady = () =>{
           const token = context.currtoken;
           if(player == null){
               player = new window.Spotify.Player({
                   name:'AuxSwap',
                    getOAuthToken: (cb) => {
                        cb(token);
                    },
               });

                player.addListener('initialization_error', ({ message }) => {
                    console.error(message);
                });
                player.addListener('authentication_error', ({ message }) => {
                    console.error(message);
                });
                player.addListener('account_error', ({ message }) => {
                    console.error(message);
                });
                player.addListener('playback_error', ({ message }) => {
                    console.error(message);
                });

                player.addListener('player_state_changed', (state) => {});
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                    this.setState({ device_id: device_id });
                });

                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.connect();
           }
       };
    },[context.currtoken]);


}

export default NewPlayer;


