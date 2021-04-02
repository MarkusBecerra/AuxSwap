import { useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import TokenContext from '../components/TokenContext';
import * as $ from "jquery";
const SOCKET_SERVER_URL = "http://localhost:4000";
const Join_event = "newJoin";
const Get_room_data = "get_room_data";
const SS_event="song_send"
const Get_topList="get_top_list"
const next_song = "get_next"
const useParty = (props) => {
    const [Username, setname] = useState('')
    const [roomNum, setroomNum] = useState()
    const [Userimage, setimage] = useState('')
    const context = useContext(TokenContext)
    const [memberlist, setMemberlist] = useState()
    const [songList,setsonglist] = useState()
    const [currentSong,setcurrentSong]=useState()
    const socketRef = useRef();
    const [SDK,setSDK]=useState()
    const [deviceID,setDeviceID]=useState()
    const [isplaying,setPlaying]=useState(false)
    
    function SDKPlay(songUrl,device_id){
        $.ajax({
            url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
            type: "PUT",
            data: '{"uris": ["'+songUrl+'"]}',
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + context.currtoken );},
            success:setPlaying(true),
           });
    }
    useEffect(() => {
        //console.log("called first ?")
        window.onbeforeunload = function () { return false; }
        setroomNum(props.room)
        
        props.setAPi(props.spotify.setAccessToken(context.currtoken))
        
        props.spotify.getMe().then((data) => {
            setimage(data.body.images[0].url)
            setname(data.body.display_name)
        }, (error) => {
            console.log(error)
        })
    }, [props.room, context.currtoken])
    useEffect(()=>{
        if(!props.SDK) return
        setSDK(props.SDK)
    },[props.SDK])
    useEffect(()=>{
        if(!props.ID) return
        setDeviceID(props.ID)
    },[props.ID])

    useEffect(()=>{
        if(!SDK)return
        if(!deviceID) return
        if(!currentSong) return
        SDK.getCurrentState().then(state=>{
            
            if(!state){
                if(!isplaying) SDKPlay(currentSong.songUrl,deviceID);
                return;
            }
            if(state.paused==true&&isplaying)
            {
                setPlaying(false)
                nextSong()
                return
            }
            if(state.paused==true&&!isplaying)
            {
                SDKPlay(currentSong.songUrl,deviceID)
                return
            }
            console.log(state)
        });
       
    },[currentSong])

    
    useEffect(() => {
        if (!SDK) return
        if (Username != '' && Userimage != '') {
            
            socketRef.current = socketIOClient(SOCKET_SERVER_URL, { query:roomNum });
            
            socketRef.current.emit(Join_event, { name: Username , data: Userimage ,room:roomNum })
            
            socketRef.current.on(Get_room_data,({ users })=>{
                setMemberlist(users);
            });
            socketRef.current.on(SS_event,({songs})=>{
                setsonglist(songs);  
            });
            socketRef.current.on(Get_topList,({song})=>{
                setcurrentSong(song)
            });
            peakTop()
            return () => {
                socketRef.current.disconnect();
                SDK.disconnect();
            }
        }
    }, [Username, Userimage,roomNum]);
    const sendSong=(song)=>{
        socketRef.current.emit(SS_event,{song})
       
    }
    const nextSong=()=>{
        console.log("next....")
        socketRef.current.emit(next_song)
      
    }
    const peakTop = ()=>{
        const c= setInterval(()=>{
            socketRef.current.emit(Get_topList)
        },1000)
        return ()=>{clearInterval(c)}
       
    }
    return {memberlist,songList,sendSong,currentSong}
};

export default useParty;