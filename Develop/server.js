const path = require('path')
const express = require('express')
const app = express()
const PORT = 3001

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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);