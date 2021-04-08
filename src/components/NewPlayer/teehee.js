import React from 'react';
import '../App.css';
import '../styles/WebPlayer.css';

let spotify = require('spotify-web-api-js');
let spotifyApi = new spotify();
let player = null;

function convertMsToMMSS(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

class PlayerController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songID: '',
            songTitle: '',
            songArtist: '',
            songImageURL: '',
            songLengthMS: 100000,
            songCurrentMS: 0,
            interval: null,
            songIDs: props.songIDs,
            token: props.token,
            songIndex: 0,
            songIndexMax: props.songIDs.length - 1,
        };

        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = this.state.token;
            if (player == null) {
                player = new window.Spotify.Player({
                    name: 'Tuun Web Player',
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

        this.PlayPause = React.createRef();
        //if (this.state.device_id == '') {
        this.StartPlayer = this.StartPlayer.bind(this);
        this.StartInterval = this.StartInterval.bind(this);
        this.StopInterval = this.StopInterval.bind(this);
        this.VisualSeek = this.VisualSeek.bind(this);
        this.Update = this.Update.bind(this);
        this.Seek = this.Seek.bind(this);
        //}
        this.Play = this.Play.bind(this);
    }

    StartPlayer() {
        //this.setState({ device_id: device_id });
        let uris = [];
        for (let songID of this.state.songIDs) {
            uris.push('spotify:track:' + songID);
        }
        spotifyApi.play({ uris: uris, device_id: this.state.device_id });
        this.Play(0);
        this.StartInterval();
        // this.Play();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.songIDs.length > 0) {
            if (nextProps.songIDs[0] !== this.state.songIDs[0] && nextProps.songIDs[1] !== this.state.songIDs[1]) {
                this.setState({ songIDs: nextProps.songIDs, songIndexMax: nextProps.songIDs.length - 1 });
            }
        }
    }

    componentDidUpdate(nextProps, prevProps) {
        if (this.props.StartNewPlayer) {
            this.StartPlayer();
            this.props.startedPlayer();
        }
    }

    StartInterval() {
        let interval = setInterval(() => {
            this.Update();
        }, 500);
        this.setState({ interval: interval });
    }

    Update() {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            if (data) {
                let songID = data['item']['id'];
                let songTitle = data['item']['name'];
                let songArtist = '';
                for (let i = 0; i < data['item']['artists'].length; i++) {
                    songArtist += data['item']['artists'][i]['name'] + ', ';
                }
                songArtist = songArtist.slice(0, songArtist.length - 2);
                let songImageURL = data['item']['album']['images'][0]['url'];
                let songLengthMS = data['item']['duration_ms'];
                let songCurrentMS = data['progress_ms'];
                let currentSongIndex = 0;
                for (let i = 0; i < this.state.songIDs.length - 1; i++) {
                    if (songID === this.state.songIDs[i]) {
                        currentSongIndex = i;
                        break;
                    }
                }
                this.setState({
                    songID: songID,
                    songTitle: songTitle,
                    songArtist: songArtist,
                    songImageURL: songImageURL,
                    songLengthMS: songLengthMS,
                    songCurrentMS: songCurrentMS,
                    songIndex: currentSongIndex,
                    songIndexMax: this.state.songIDs.length - 1,
                    playing: data['is_playing'],
                });
            }
        });
    }

    // componentDidMount() {
    //     if (player == null) {
    //         const script = document.createElement('script');

    //         script.src = 'https://sdk.scdn.co/spotify-player.js';
    //         script.async = true;

    //         document.body.appendChild(script);
    //     } else {
    //         this.StartInterval();
    //     }
    // }

    Seek(seekPos) {
        spotifyApi.seek(seekPos);
        this.StartInterval();
    }

    componentWillUnmount() {
        this.StopInterval();
    }

    StopInterval() {
        clearInterval(this.state.interval);
    }

    VisualSeek(seekPos) {
        this.setState({ songCurrentMS: seekPos });
    }

    Play(plusMinusIndex) {
        this.PlayPause.current.setState({ isPlaying: true });
        this.setState({ songIndex: this.state.songIndex + plusMinusIndex });
    }

    render() {
        if (this.state.songIDs.length > 0) {
            return (
              <div>
                <Footer>
                  <Progress songLengthMS={this.state.songLengthMS} songCurrentMS={this.state.songCurrentMS} seek={this.Seek} stopInterval={this.StopInterval} visualSeek={this.VisualSeek} />
                  <div className='btn-group' role='group'>
                    <div type='button' className='btn btn-secondary'>
                        <Previous togglePlay={this.Play} currentIndex={this.state.songIndex} maxIndex={this.state.songIndexMax} />
                    </div>
                    <div type='button' className='btn btn-secondary'>
                        <PlayPause ref={this.PlayPause} isPlaying={this.state.playing} />
                    </div>
                    <div type='button' className='btn btn-secondary'>
                        <Next togglePlay={this.Play} currentIndex={this.state.songIndex} maxIndex={this.state.songIndexMax} />
                    </div>
                  </div>
                  <Volume />
                  <br></br>
                </Footer>
              </div>
            );
        } else {
            return <div>Load or generate a playlist.</div>;
        }
    }
}

// <div>
//     <CurrentSong songTitle={this.state.songTitle} songArtist={this.state.songArtist} songImageURL={this.state.songImageURL} />
// </div>

class Footer extends React.Component {
    render() {
        return <div className='webplayback-bar'>{this.props.children}</div>;
    }
}

class CurrentSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songTitle: '',
            songArtist: '',
            songImageURL: '',
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps;
    }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.songImageURL !== prevState.songImageURL || nextProps.songTitle !== prevState.songTitle || nextProps.songArtist !== prevState.songArtist) {
            this.setState(nextProps);
        }
    }

    render() {
        return (
            <div>
                <img src={this.state.songImageURL} height={100} alt='Current Song'></img>
                <div>{this.state.songTitle}</div>
                <div>{this.state.songArtist}</div>
            </div>
        );
    }
}

class PlayPause extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
        };
        this.playPause = this.playPause.bind(this);
    }

    playPause() {
        if (this.state.isPlaying) {
            spotifyApi.pause();
        } else {
            spotifyApi.play();
        }
        this.setState({
            isPlaying: !this.state.isPlaying,
        });
    }

    render() {
        if (this.state.isPlaying) {
            return (
                <div>
                    <button className='btn btn-primary purple-btn' onClick={this.playPause}>
                        {' '}
                        Pause
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className='btn btn-primary purple-btn' onClick={this.playPause}>
                        {' '}
                        Play
                    </button>
                </div>
            );
        }
    }
}

class Previous extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            togglePlay: props.togglePlay,
            currentIndex: props.currentIndex,
            maxIndex: props.maxIndex,
        };
        this.previous = this.previous.bind(this);
    }

    componentDidUpdate(next, prev) {
        if (next.currentIndex !== prev.currentIndex && next.maxIndex !== prev.maxIndex) {
            this.setState(next);
        }
    }

    previous() {
        spotifyApi.skipToPrevious();
        this.state.togglePlay(-1);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentIndex !== prevState.currentIndex || nextProps.maxIndex !== prevState.maxIndex) {
            return nextProps;
        } else return null;
    }

    render() {
        if (this.state.currentIndex > 0) {
            return (
                <div>
                    <button className='btn btn-primary purple-btn' onClick={this.previous}>
                        {' '}
                        Back{' '}
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className='btn btn-primary purple-btn' disabled={true}>
                        {' '}
                        Back{' '}
                    </button>
                </div>
            );
        }
    }
}

class Next extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            togglePlay: props.togglePlay,
            currentIndex: 0,
            maxIndex: 1,
        };
        this.next = this.next.bind(this);
    }

    componentDidUpdate(next, prev) {
        if (next.currentIndex !== prev.currentIndex && next.maxIndex !== prev.maxIndex) {
            this.setState(next);
        }
    }

    next() {
        spotifyApi.skipToNext();
        this.state.togglePlay(1);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentIndex !== prevState.currentIndex) {
            return nextProps;
        } else return null;
    }

    render() {
        if (this.state.currentIndex < this.state.maxIndex) {
            return (
                <div>
                    <button className='btn btn-primary purple-btn' onClick={this.next}>
                        {' '}
                        Next
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className='btn btn-primary purple-btn' disabled={true}>
                        {' '}
                        Next
                    </button>
                </div>
            );
        }
    }
}

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songCurrentMS: 0,
            songLengthMS: 99999,
            seek: () => {},
            stopInterval: () => {},
            visualSeek: () => {},
        };
        this.seek = this.seek.bind(this);
        this.stopInterval = this.stopInterval.bind(this);
        this.visualSeek = this.visualSeek.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.songCurrentMS !== prevState.songCurrentMS || nextProps.songLengthMS !== prevState.songLengthMS) {
            return nextProps;
        } else return null;
    }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.songLengthMS !== prevState.songLengthMS || nextProps.songCurrentMS !== prevState.songCurrentMS) {
            this.setState(nextProps);
        }
    }

    seek(event) {
        this.props.seek(event.target.value);
    }

    stopInterval(event) {
        this.props.stopInterval();
    }

    visualSeek(event) {
        this.props.visualSeek(event.target.value);
    }

    render() {
        return (
            <div className='webplayer-progressbar'>
                {convertMsToMMSS(this.state.songCurrentMS)}
                <input type='range' min='0' max={this.state.songLengthMS} value={this.state.songCurrentMS} onTouchStart={this.stopInterval} onMouseDown={this.stopInterval} onTouchEnd={this.seek} onMouseUp={this.seek} onChange={this.visualSeek} step='1' />
                {convertMsToMMSS(this.state.songLengthMS)}
            </div>
        );
    }
}

class Volume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 100,
        };
        this.setVolume = this.setVolume.bind(this);
    }

    setVolume(event) {
        this.setState({
            volume: event.target.value,
        });
        spotifyApi.setVolume(this.state.volume, function (err, data) {
            if (err) console.error(err);
        });
    }

    render() {
        return (
            <div>
                <img src='volume.png' width='30' height='30' alt='tuun logo' />
                <input type='range' min='0' max='100' value={this.state.volume} onChange={this.setVolume} step='1' />
            </div>
        );
    }
}

class SongQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: props.songs,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ songs: props.songs });
    }

    componentDidUpdate(nextProps, prevProps) {
        if (nextProps.songs.length > 0) {
            if (nextProps.songs[0] !== prevProps.songs[0]) {
                this.setState({ songs: nextProps.songs });
            }
        }
    }

    render() {
        let Songs = [];
        for (let i = 0; i < this.state.songs.length; i++) {
            Songs.push(<Song id={this.state.songs[i]} key={i} />);
        }
        if (this.state.songs.length > 0) {
            return (
                <div className='webplayer-container'>
                    <table className='table table-dark webplayer-table'>
                        <tbody>{Songs}</tbody>
                    </table>
                </div>
            );
        } else {
            return <></>;
        }
    }
}

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: '',
            artists: '',
            imageURL: '',
            length: 0,
        };
        this.GetTrackInfo();
    }

    componentDidUpdate(nextProps, prevProps) {
        if (nextProps.id !== prevProps.id) {
            this.setState(nextProps);
            this.GetTrackInfo();
        }
    }

    GetTrackInfo() {
        spotifyApi.getTrack(this.props.id).then((data) => {
            let artists = '';
            for (let i = 0; i < data['artists'].length; i++) {
                artists += data['artists'][i]['name'] + ', ';
            }
            artists = artists.slice(0, artists.length - 2);
            this.setState({
                name: data['name'],
                artists: artists,
                imageURL: data.album.images.length > 0 ? data['album']['images'][0]['url'] : 'logo.clearbit.com/spotify.com',
                length: data['duration_ms'],
            });
        });
    }

    render() {
        return (
            <tr>
                <td>
                    <img src={this.state.imageURL} height={30} alt='Album Cover'></img>
                </td>
                <td>
                    <p className='bold'>{this.state.name}</p>
                    <p>{this.state.artists}</p>
                </td>
            </tr>
        );
    }
}

class WebPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevSongs: [],
            songIDs: [],
            token: props.token,
        };
        spotifyApi.setAccessToken(this.state.token);
    }

    componentDidUpdate(nextProps, prevState) {
        let prevMerged = this.state.songIDs;
        let nextMerged = nextProps.songIDs.shared.concat(nextProps.songIDs.rest);
        if (nextMerged.length > 0) {
            if (nextMerged[0] !== prevMerged[0]) {
                this.setState({ songIDs: nextMerged, StartNewPlayer: nextProps.StartNewPlayer });
            }
        }
    }

    render() {
        return (
            <div>
                <SongQueue songs={this.state.songIDs} />
                <PlayerController songIDs={this.state.songIDs} token={this.state.token} startedPlayer={this.props.startedPlayer} StartNewPlayer={this.props.StartNewPlayer} />
            </div>
        );
    }
}

export { WebPlayer, SongQueue };