import { useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import TokenContext from '../components/TokenContext';
const SOCKET_SERVER_URL = "http://localhost:4000";
const Join_event = "newJoin";
const Get_room_data = "get_room_data";

const useParty = (props) => {
    const [Username, setname] = useState('')
    const [roomNum, setroomNum] = useState()
    const [Userimage, setimage] = useState('')
    const context = useContext(TokenContext)
    const [memberlist, setMemberlist] = useState()
    const socketRef = useRef();
    
    useEffect(() => {
        //console.log("called first ?")
        window.onbeforeunload = function () { return false; }
        setroomNum(props.room)
        
        props.setAPi(props.spotify.setAccessToken(context.currtoken))
        
        props.spotify.getMe().then((data) => {
            setimage(data.images[0].url)
            setname(data.display_name)
        }, (error) => {
            console.log(error)
        })
    }, [props.room, context.currtoken])
    
    useEffect(() => {

        if (Username != '' && Userimage != '') {
            
            socketRef.current = socketIOClient(SOCKET_SERVER_URL, { query:roomNum });
            
            socketRef.current.emit(Join_event, { name: Username , data: Userimage ,room:roomNum })
            
            socketRef.current.on(Get_room_data,({ users })=>{
                setMemberlist(users);
               
            });
            return () => {
                socketRef.current.disconnect();
            }
        }
    }, [Username, Userimage,roomNum])
    
    
    return {memberlist}
};

export default useParty;