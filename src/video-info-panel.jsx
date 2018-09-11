import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import ReactPlayer from 'react-player';

export default class VideoInfoPanel extends React.Component {
    // TODO: Add websockets
    constructor(props) {
        super(props)
        this.state = {
            position: 0,
            played: 0,
            loaded: 0,
            duration: 0,
        };
        this.playlist = [
            {name: "drifto", url: "https://www.youtube.com/watch?v=yothf5A2Mgk" },
            {name: "Mussel Beach by PES", url: "https://www.youtube.com/watch?v=LaHTyB399z8"},
            {name: "שטיח || Rug", url: "https://vimeo.com/channels/staffpicks/280980737"}
        ];
        // TODO: Fix the server URI
        this.client = io('http://localhost:9091');
        // this.client.on('update', msg => this.handleUpdate(msg));
    }

    handleUpdate = (msg) => {
        console.log(msg);
        this.setState({ name: msg })
    }

    loadNext = () => {
        let newState = this.state;
        if (newState.position + 1 == this.playlist.length) {
            newState.position = 0;  // if at end of playlist restart
            // this.client.emit('now-playing', this.playlist[newState.position])
            console.log("Restarting playlist")
        } else {
            newState.position++;
        }
        this.setState(newState)
    }

    render() {
        let video = this.playlist[this.state.position];
        this.client.emit('now-playing', video);
        console.log(`Playing ${video.name} from ${video.url}`)
        return (
        <div>
            <h1>{video.name}</h1>
            <ReactPlayer
                url={video.url}
                playing
                controls
                onEnded={this.loadNext}
                />
        </div>);
    }


}