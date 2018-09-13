var socket = require('socket.io');

function websocketServer(server, initCallback, sendNextVideo) {
    if (!(this instanceof websocketServer)) {
        return new websocketServer(server);
      }
    
    this.server = server;
    this.io = socket(this.server);
    
    // Setup websocket listening functions
    this.io.on('connection', function(socket) {
        
        initCallback(socket);

        // Sends the next video in the playlist to the client
        socket.on('next-video', function(data) {
            sendNextVideo(socket);
        })

        // Propagate changes when a new video starts playing
        socket.on('now-playing', function(data) {
            socket.broadcast.emit('now-playing', data);
        });
        console.log('Client connected.')
    });

    // On disconnect
    this.io.on('disconnect', function() {console.log('Client disconnected.')});
}


module.exports = websocketServer;