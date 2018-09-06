import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import SocketIO from 'socket.io';


const app = express();
const socket = new SocketIO(app);
socket.on('connection', console.log('Client connected.'))


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


app.use(cors());

app.get(['/vote', '/live'], (req, res) => {
    res.send()
})

app.get('/live', (req, res) => {
    res.send('Hello World')
});


app.listen(9091, () => {
    console.log("Listening on port 9091");
});

