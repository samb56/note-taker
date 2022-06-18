const path = require('path')
const express = require('express')
const app = express()
const PORT = 3001
const { v4: uuidv4 } = require('uuid')
const newId = uuidv4()
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// "/notes" responds with the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../Develop/public/notes.html'));
});

// All other routes respond with the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Develop/public/index.html'));
});


app.get('/api/notes', (req, res) => {



  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) { console.error(err) }
    else {
      const displayNotes = JSON.parse(data)
      res.json(displayNotes)

    }
  })

  console.info(`${req.method} request received to get notes`);
});


app.post('/api/notes', (req, res) => {

  console.info(`${req.method} request received to add a note`);


  const { title, text, ID } = req.body;


  if (title && text) {

    const newNote = {
      title,
      text,
      ID: uuidv4(),

    };


    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {

        const parsedNotes = JSON.parse(data);


        parsedNotes.push(newNote);


        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});







app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);