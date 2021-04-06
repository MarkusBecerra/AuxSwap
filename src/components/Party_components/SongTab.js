import React from 'react'
import "./SongTab.css"

export default function SongTab({song,setsong}) {
    function handleClick(){
        if(!song)return
        setsong(song)
    }
    return (
        // <div className="song-tab"onClick={handleClick}>
        //    <img src={song.image}/>
        //    <div className="song-name-party">{song.songName}</div>
        //    <div className="artist-name-party">{song.artist}</div>
        // </div>

        <div dclassName="result-container">
          <ul className="result-list-party">
              
                 <li className="song-info-list-item" onClick={handleClick}>
                      <div>
                        <img className="search-images" src={song.image} />
                        <div className="song-name">{song.songName}</div>
                        <div className="song-artist">{song.artist}</div>
                      </div>
                </li>
                  
              
          </ul>
        </div>
    )
}
