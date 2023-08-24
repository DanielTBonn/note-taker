const notes = require('express').Router();
const { readFile, writeFile } = require('fs');
const db = require('../../../db/db.json');

    
notes.route('/')
    .get((req, res) => {
    console.info(`GET /api/notes`)
    res.status(200).json(db);
})
    .post((req, res) => {
    
    console.info(`${req.method} request recieved to add info`)
    
    console.info("You're in the posting stage")
    
    const newNote = {
        title: 'Sample Title',
        text: 'Sample Text',
    };
    if (newNote.title && newNote.text) {
        const file = `./db/db.json`;
        readFile(file, (err, data) => {
            const oldNotes = (data && JSON.parse(data)) || [];
            oldNotes.push(newNote);
            
            writeFile(file, JSON.stringify(oldNotes), (err) => {
                err
                ? console.error(err)
                : console.log(`A note for ${newNote.title} has been written to JSON file`);
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