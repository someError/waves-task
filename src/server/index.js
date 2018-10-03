const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const usersController = require('./controllers/users');

const jsonParser = bodyParser.json({ limit: '50mb' });

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.get('/users', usersController.getAll);

app.post('/users', usersController.add);

app.put('/users/:id', usersController.update);

app.delete('/users/:id', usersController.delete);


db.connect('mongodb://127.0.0.1:27017', (err, client) => {
 if(err) {
  return console.log(err)
 }

 app.listen(3001, function () {
  console.log('server started')
 })
});


