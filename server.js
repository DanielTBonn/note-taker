// essential variables for running our server and keeping track of data in a data base
const express = require('express');
const path = require('path')
const fs = require('fs');
const db = require('./db/db.json')

const PORT = 3001;

// initialize our server with express
const app = express();

// server will be able to read json and urlencoded POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uses static files from the public directory
app.use(express.static('public'));

// the / route routes to public/index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// the /notes route routes to public/notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// sets our db.json to the url path /api/notes
app.get('/api/notes', (req, res) => {
    res.json(db);
});

// commits post valid POST requests to our db.json
app.post('api/notes', (req, res) => {


    // const newNote = {
    //     name: '',
    //     note: '',
    // };
    if (true) {
        fs.readFile(db, (err, data) => {
            const oldNotes = (data && JSON.parse(data)) || [];
            oldNotes.push(newNote);

            fs.writeFile(db, JSON.stringify(oldNotes), (err) =>
            err
            ? console.error(err)
            : console.log(
                `A note for ${newNote.name} has been written to JSON file`)
                );
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }

});


app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})