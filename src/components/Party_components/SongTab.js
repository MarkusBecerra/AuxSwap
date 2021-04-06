import React from 'react'

export default function SongTab({song,setsong}) {
    function handleClick(){
        if(!song)return
        setsong(song)
    }
    return (
        <div className="song-tab"onClick={handleClick}>
           <img src={song.image}/>
           <div className="song-name">{song.songName}</div>
           <div className="artist-name">{song.artist}</div>
        </div>
    )
}
