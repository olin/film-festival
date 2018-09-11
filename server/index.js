import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import SocketIO from 'socket.io';
import http from 'http';


const app = express();
var server = http.Server(app);
var io = SocketIO(server);



// Handle environment file
if (fs.exists('./.env')) {
    dotenv.config();
}

let test = 0;
updateName = () => {
    socket.broadcast('update', test);
    test += 1;
}

// Regex to match on GET requests from component URIs
const video = /https:\/\/(www\.youtube|vimeo)\.com\//;

io.on('connection', console.log('Client connected.'))

app.use(cors());

app.get(['/vote', '/live'], (req, res) => {
    res.send()
})

app.get('/live', (req, res) => {
    res.send('Hello World')
});


server.listen(9091);
