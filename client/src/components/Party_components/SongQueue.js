import React from 'react'
import './SongQueue.css'

export default function SongQueue({song, isFirst}) {
  
    return (
        <div>
            <div>
                <ul className={isFirst?"result-list-party-v":"result-list-party"}>
                    <li className="song-info-list-item-party">
                        <img className="search-images-party" src={song.image}/>
                        <div className="song-name-party">{song.songName}</div>
                        <div className="artist-name-party">{song.artist}</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
