const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');

// Initializing server + websockets
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Handle environment file
if (fs.exists('./.env')) {
    dotenv.config();
}

let test = 0;
function updateName() {
    socket.broadcast('update', test);
    test += 1;
}

// Regex to match on GET requests from component URIs
const video = /https:\/\/(www\.youtube|vimeo)\.com\//;

io.on('connection', function(socket) {
    socket.on('now-playing', function(data) {
        console.log(data);
        socket.broadcast.emit('now-playing', data);
    })
    console.log('Client connected.')
});

io.on('disconnect', function() {console.log('Client disconnected.')});

function handleVideoUpdate(data) {
    console.log(data)
    io.broadcast('update-video', data)
}

app.use(cors());

app.get(['/vote'], (req, res) => {
    res.send()
})

app.get('/live', (req, res) => {
    res.send('Hello World')
});

// Begin servergi
server.listen(9091);