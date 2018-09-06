import React from 'react';
import PropTypes from 'prop-types';
import SocketIO from 'socket.io-client';

export default class VideoInfoPanel extends React.Component {
    // TODO: Add websockets
    constructor(props) {
        super(props)
        this.state = { name: "Test", url: "test2" };
        // TODO: Fix the server URI
        this.client = new SocketIO('http://localhost:9091');
        this.client.on('update', msg => this.handleUpdate(msg));
    }

    handleUpdate = (msg) => {
        console.log(msg);
        this.setState({ name: msg })
    }    

    render() {
        return (
        <div>
            {this.state.name}    
        </div>);
    }

    
} 