import React from 'react';
import PropTypes from 'prop-types';
import SocketIO from 'socket.io-client';
import ReactPlayer from 'react-player';

export default class VideoInfoPanel extends React.Component {
    // TODO: Add websockets
    constructor(props) {
        super(props)
        this.state = { name: "drifto", url: "https://www.youtube.com/watch?v=yothf5A2Mgk" };
        // TODO: Fix the server URI
        // this.client = new SocketIO('http://localhost:9091');
        // this.client.on('update', msg => this.handleUpdate(msg));
    }

    handleUpdate = (msg) => {
        console.log(msg);
        this.setState({ name: msg })
    }

    render() {
        return (
        <div>
            <h1>{this.state.name}</h1>
            <ReactPlayer url={this.state.url} playing />
        </div>);
    }


}