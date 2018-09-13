import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import ReactPlayer from 'react-player';

export default class VideoInfoPanel extends React.Component {
    // TODO: Add websockets
    constructor(props) {
        super(props)
        this.state = {
            video: {},
        };
        // TODO: Fix the server URI
        this.client = io('http://localhost:9091');
        this.client.on('load-next', this.handleUpdate);
        // this.client.on('update', msg => this.handleUpdate(msg));
    }

    handleUpdate = (msg) => {
        console.log("New video");
        console.log(msg);
        this.setState({ video: msg });
    }

    loadNext = () => {
        this.client.emit('next-video');
    }

    render() {
        // this.client.emit('now-playing', video);
        console.log(`Playing ${this.state.video.name} from ${this.state.video.url}`)
        return (
        <div>
            <h1>{this.state.video.name}</h1>
            <div className="player-wrapper">
            <ReactPlayer
                url={"http://localhost:9091/media/" + this.state.video.url}
                playing={true}
                controls={false}
                onEnded={this.loadNext}
                width={window.innerWidth}
                height={window.innerHeight}
                />
            </div>
        </div>);
    }


}