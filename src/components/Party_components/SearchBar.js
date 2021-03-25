import { useState, useEffect } from 'react'
import { FormControl } from 'react-bootstrap';
import "./SearchBar.css";
import SongTab from "./SongTab"
export default function SearchBar({api,handleSongSend}) {

    const [currentApi, setApi] = useState()
    const [useForSearch, setUseSearch] = useState("")
    const [result, setresult] = useState([])
    const [songForsend,setsongForsend] = useState()

    //console.log(result)
    function chooseYes(){
        handleSongSend(songForsend)
        setsongForsend()
    }
    function chooseNo(){
        setsongForsend()
    }
    function setsong(song){
        setsongForsend(song)
        //console.log(song)
        setUseSearch("")
    }
    useEffect(() => {
        if (!api) return
        setApi(api)
    }, [api])
    useEffect(() => {
        if (!currentApi) return
        if (!useForSearch) return setresult([])
        setsongForsend()
        currentApi.searchTracks(useForSearch).then((data) => {
            setresult(
                data.body.tracks.items.map(track => {
                    return {
                        songName: track.name,
                        artist: track.artists[0].name,
                        image: track.album.images[2].url,
                        songUrl: track.uri
                    }

                })
            )
        })
    }, [useForSearch, currentApi])
    return (
        <div className="search-box">
            <FormControl
                type="search"
                placeholder="Enter song name"
                value={useForSearch}
                onChange={event => setUseSearch(event.target.value)}
            />
            <div className="song-box">
                {
                    result.map(song=>(
                        <SongTab song={song} key={song.songUrl} setsong={setsong}/>
                    ))
                }
                
            </div>
            <div className="decision-box">
                {songForsend? (
                    <div>
                        <img src={songForsend.image}/>
                        {songForsend.songName}
                        <button onClick={chooseYes}>Yes send!</button>
                        <button onClick={chooseNo}>No dont send!</button>
                    </div>
                ):null}
            </div>
        </div>
    )
}
