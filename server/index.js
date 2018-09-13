const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const express = require('express');
const socket = require('./websocket-server');
const http = require('http');

var playlist = [{name: "drifto", url: "https://www.youtube.com/watch?v=yothf5A2Mgk" },
    {name: "Mussel Beach by PES", url: "https://www.youtube.com/watch?v=LaHTyB399z8"},
    {name: "שטיח || Rug", url: "https://vimeo.com/channels/staffpicks/280980737"}
];

var curVideo = 0;


function initClient(socket) {
    // Send the currently playing video to clients
    socket.emit('load-next', playlist[curVideo])
    socket.emit('now-playing', playlist[curVideo]);
}

function getNextVideo(socket) {
    // Move to the next video, looping back if necessary
    curVideo = (curVideo + 1) % playlist.length;

    const data = playlist[curVideo];
    console.log(data);
    socket.emit('load-next', data);
    // Update the "guide" clients
    socket.broadcast.emit('now-playing', data);
}


// Initializing server + websockets

var app = express();
var server = http.Server(app);
console.log(initClient);
var socketServer = new socket(server, initClient, getNextVideo);

// Handle environment file
if (fs.exists('./.env')) {
    dotenv.config();
}

app.use(cors());

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['mp4'],
    maxAge: '1d',
    redirect: false,
};

app.use('/media', express.static('media', options));

app.get('/media/:file', (req, res) => {
    console.log('Served static file.')
    res.send('Big bunny')
})

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get(['/vote'], (req, res) => {
    res.send()
})

app.get('/live', (req, res) => {
    res.send('Hello World')
});

// Begin servergi
server.listen(9091);