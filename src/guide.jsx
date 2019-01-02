import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

export default class GuidePanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            video: null,
        }
        this.client = io('http://localhost:9091');
        this.client.on('now-playing', this.handleUpdate);
    }

    handleUpdate = (data) => {
        console.log('Received data: ');
        console.log(data)
        this.setState({ video: data });
        console.log(this.state);
    }


    render() {
        return ( this.state.video === null ? 
        <div className={"guide"}>
            <p>Not connected</p>
        </div> :
        <div className={"guide"}>
            <h1>Now Playing: {this.state.video.name}</h1>
            <p>hyperlink: <a href={this.state.video.url}>{this.state.video.url}</a></p>
        </div>);
    }
}