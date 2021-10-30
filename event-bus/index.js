const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// store
const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://coms-srv:5000/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://query-srv:4002/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://moderation-srv:4006/events', event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(8000, () => {
  console.log('Event Bus listening on port 8000');
});
