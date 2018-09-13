var http = require('http');
var socket = require('socket.io');

function websocketServer(app) {
    if (!(this instanceof websocketServer)) {
        return new websocketServer(app);
      }
    
    this.app = app;
    this.server = http.Server(this.app);
    this.io = socket(this.server);
    
    // Setup websocket listening functions
    this.io.on('connection', function(socket) {
        // Send the currently playing video to clients
        socket.emit('now-playing', curVideo);
    
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