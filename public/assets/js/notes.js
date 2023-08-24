// variables that will create the route to /api/notes for using get and post methods
const notes = require('express').Router();
const { readFile, writeFile, readFileSync } = require('fs');
const uuid = require('./uuid');
const file = `./db/db.json`;


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
            id: uuid()
        };

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


notes.route('/:id')
    .get((req, res) => {
        if (req.params.id) {
            console.info(`${req.method} request received to get a single note`);
            const id = req.params.id;
            const oldNotes = JSON.parse(readFileSync(`./db/db.json`, 'utf8'));
            for (let i = 0; i < oldNotes.length; i++) {
                const currentNote = oldNotes[i];
                if (currentNote.id === id) {
                    res.status(200).json(currentNote);
                    console.log('Current Note Found\n', currentNote);
                    return;
                }
            }
            res.status(404).send('Review not found');
        } else {
            res.status(400).send('Review ID not provided');
        }
    })
    .delete((req, res) => { 
        if (req.params.id) {
            console.info(`${req.method} request received to delete a single note`);
            const id = req.params.id;
            const oldNotes = JSON.parse(readFileSync(`./db/db.json`, 'utf8'));
            for (let i = 0; i < oldNotes.length; i++) {
                const currentNote = oldNotes[i];
                if (currentNote.id === id) {
                    oldNotes.splice(i, 1);
                    res.status(200).send(`Successfully removed note ${id}`);
                    writeFile(file, JSON.stringify(oldNotes, null, 4), (err) => {
                        err ? console.error(err) : console.log('Removed Note:\n', currentNote);
                    });

                    return;
                }
            }
            res.status(404).send('Review not found');
        } else {
            res.status(400).send('Review ID not provided');
        }
        })


module.exports = notes;