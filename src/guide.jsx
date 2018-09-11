import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

export default class GuidePanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            video: ''
        }
        this.client = io('http://localhost:9091');
        this.client.on('now-playing', (data) => {
            console.log('Received data: ');
            console.log(data)
            this.setState({ video: data.name })
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
            <h1>Now Playing: {this.state.video.name}</h1>
            <p>hyperlink: {this.state.video.url}<a href="http://example.com">http://example.com</a></p>
        </div>);
    }
}