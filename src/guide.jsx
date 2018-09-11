import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

export default class GuidePanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            video: null
        }
        this.client = io('http://localhost:9091');
        this.client.on('now-playing', (data) => {
            console.log('Received data: ' + data);
        })
    }


    render() {
        if (this.state.video == null) {
            return (
                <div>
                    <p>Not connected</p>
                </div>
            )
        }
        return (
        <div>
            <h1>Now Playing: {video.name}</h1>
            <p>hyperlink: {video.url}<a href="http://example.com">http://example.com</a></p>
        </div>);
    }
}