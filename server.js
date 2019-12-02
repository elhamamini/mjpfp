const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, './static')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/api/days', (req, res, next) => {
  db.Day.findAll({
    order: ['day']
  })
    .then(days => res.send(days))
    .catch(next);
});
app.post('/api/events', (req, res, next) => {
  const newEvent = {
    task: req.body.task,
    dayId: req.body.dayId,
    monthId: req.body.monthId,
    yearId: req.body.yearId
  };
  console.log('eee', req.body);

  db.Event.create(newEvent)
    .then(event => {
      //   res.statusCode = 200;
      res.send(event);
    })
    .catch(e => {
      // res.statusCode = 400;
      next(e);
    });
});
app.put('/api/events/:id', (req, res, next) => {
  console.log('body', req.body);
  db.Event.update(req.body, { where: { id: req.params.id } })
    .then(response => res.send(response.data))
    .catch(e => console.log(e));
});
app.delete('/api/events/:id', (req, res, next) => {
  console.log(req.params.id, 'idddd');
  db.Event.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(events => {
      console.log('events', events);
      res.status(200).send({ id: req.params.id, message: 'delete success' });
    })
    .catch(next);
});

app.get('/api/events', (req, res, next) => {
  db.Event.findAll()
    .then(events => res.send(events))
    .catch(next);
});
app.get('/api/years/:id', (req, res, next) => {
  db.Year.findByPk(req.params.id)
    .then(year => res.send(year))
    .catch(next);
});
app.get('/api/months/:id', (req, res, next) => {
  db.Month.findByPk(req.params.id)
    .then(month => res.send(month))
    .catch(next);
});
db.syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log('sucsess');
  });
});
