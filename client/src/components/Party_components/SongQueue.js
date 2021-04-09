import React from 'react'
import './SongQueue.css'

export default function SongQueue({song}) {
  
    return (
        <div>
            <div>
           <img src={song.image}/>
           <div className="song-name">{song.songName}</div>
           <div className="artist-name">{song.artist}</div>
            </div>
        </div>
    )
}
