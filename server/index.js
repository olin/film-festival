const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const express = require('express');
const socket = require('./websocket-server');
const http = require('http');
const bodyParser = require('body-parser');

const files = fs.readdirSync('media');
console.log(files);

const metadata = {'big_buck_bunny.mp4': 'Big Buck Bunny', 'echo-hereweare.mp4': 'Here We Are'}
var curVideo = 0;


function initClient(socket) {
    const video = {url: files[curVideo], name: metadata[files[curVideo]]};
    // Send the currently playing video to clients
    socket.emit('load-next', video)
    socket.emit('now-playing', video);
}

function getNextVideo(socket) {
    // Move to the next video, looping back if necessary
    curVideo = (curVideo + 1) % files.length;

    const data = {url: files[curVideo], name: metadata[files[curVideo]]};
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

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
    // socketServer.updatePoints({points: [[10,10],[20,10],[20,20], [10,20]]});
    // socketServer.updatePoints({points: req.points});

});

app.post('/points', (req, res) => {
    console.log(req.body);
    // console.log(req.body.points.x)
    socketServer.updatePoints({points: req.body.points});
    res.send('Points successfully updated.');
});

// Begin servergi
server.listen(9091);