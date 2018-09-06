import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
const app = express();

// Handle environment file
if (fs.exists('./.env')) {
    dotenv.config();
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

