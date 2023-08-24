// variables that will create the route to /api/notes for using get and post methods
const notes = require('express').Router();
const { readFile, writeFile } = require('fs');
const uuid = require('./uuid');

// notes router
notes.route('/')
    // reads the current file db.json
    .get((req, res) => {
        console.info(`GET /api/notes`)
        readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedNotes = JSON.parse(data)
            res.json(parsedNotes);
        }
    })
    })

    // updates the current db.json file with a new note
    .post((req, res) => {
        console.info(`${req.method} request recieved to add info`)

        console.info(req.body)
        const { title, text } = req.body;
        
    if (req.body) {
        
        const newNote = {
            title,
            text,
        };

        const file = `./db/db.json`;
        readFile(file, (err, data) => {
            const oldNotes = (data && JSON.parse(data)) || [];
            oldNotes.push(newNote);
            
            writeFile(file, JSON.stringify(oldNotes, null, 4), (err) => {
                err ? console.error(err) : console.log(`A note for ${newNote.title} has been written to JSON file`);
            });
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

module.exports = notes;