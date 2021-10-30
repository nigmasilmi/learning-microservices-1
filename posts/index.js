const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const { default: axios } = require('axios');

const posts = {};

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

// Handlers
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString('hex');
  posts[id] = { id, title };
  // emitimos el evento hacia el broker
  await axios.post('http://event-bus-srv:8000/events', {
    type: 'PostCreated',
    data: { id, title },
  });
  res.status(201).send(posts[id]);
});

// listening to events
app.post('/events', (req, res) => {
  ///
  console.log('received event', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('some second marker');
  console.log('Post Service listening on port 4000');
});
