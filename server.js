const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db');
const path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/api/days', (req, res, next) => {
  db.Day.findAll({
    include: [db.Event]
  })
    .then(days => res.send(days))
    .catch(next);
});
app.post('/api/events', (req, res, next) => {
  const newEvent = {
    task: req.body.task
  };
  db.Event.create(newEvent)
    .then(event => res.send(event))
    .catch(next);
});
app.get('/api/events', (req, res, next) => {
  db.Event.findAll()
    .then(events => res.send(events))
    .catch(next);
});
app.get('/api/years/:id', (req, res, next) => {
  db.Year.findByPk(req.params.id).then(year => res.send(year));
});
app.get('/api/months/:id', (req, res, next) => {
  db.Month.findByPk(req.params.id).then(month => res.send(month));
});
db.syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log('sucsess');
  });
});
