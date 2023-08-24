// essential variables for running our server and keeping track of data in a data base
const express = require('express');
const path = require('path');
const notes = require('./public/assets/js/notes') 
const db = require('./db/db.json')

const PORT = 3001;

// initialize our server with express
const app = express();

// server will be able to read json and urlencoded POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uses static files from the public directory
app.use(express.static('public'));
// sets the path for the notes objects added to db.json
app.use('/api/notes', notes)

// the / route routes to public/index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// the /notes route routes to public/notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes/:id', (req, res) => {
    if (req.params.review_id) {
        console.info(`${req.method} request received to get a single a review`);
        const id = req.params.id;
        for (let i = 0; i < db.length; i++) {
          const currentNote = db[i];
          if (currentNote.id === id) {
            res.status(200).json(currentReview);
            return;
          }
        }
        res.status(404).send('Review not found');
      } else {
        res.status(400).send('Review ID not provided');
      }
});


// sets the server to output the application to a local port
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})