// essential variables for running our server and keeping track of data in a data base
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const notes = require('./public/assets/js/notes') 

const PORT = 3001;

// initialize our server with express
const app = express();

// server will be able to read json and urlencoded POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uses static files from the public directory
app.use(express.static('public'));
app.use('/api/notes', notes)



// the / route routes to public/index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// the /notes route routes to public/notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// sets our db.json to the url path /api/notes
// app.get('/api/notes', (req, res) => {
//     console.info(`GET /api/notes`)
//     res.status(200).json(db);
// });

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})