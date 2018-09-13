const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const express = require('express');

// Initializing server + websockets

var app = express();

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