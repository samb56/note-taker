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

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//landing page when unfamiliar term is used
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')))

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html')))


app.get('/api/notes', (req, res) => {

  res.json(`${req.method} request received to get notes`);


  console.info(`${req.method} request received to get notes`);
});

// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text, ID } = req.body;

  // If all the required properties are present
  if (title && text && ID) {
    // Variable for the object we will save
    const newNote = {
      noteTitle,
      noteText,
      note_id: uuidv4(),

    };

    // Obtain existing reviews
    fs.readFile('/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
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