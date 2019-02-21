const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const path = require('path');

const mongoClient = new MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true
});
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/dist'));

let dbClient;

mongoClient.connect((err, client) => {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db('usersdb').collection('users');
  app.listen(3000, console.log('Сервер запущен 3000'));
});

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
})

// GET USERS
app.get('/api/users', (req, res) => {
  app.locals.collection.find({}).toArray((err, users) => {
    if (err) return console.log(err);
    res.json(users);
  })
});

// ADD USER
app.post('/api/users', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const user = {
    name: req.body.name,
    age: req.body.age
  }
  app.locals.collection.insertOne(user, (err, result) => {
    if (err) return console.log(err);
    res.send(user);
  })
});

// EDIT USER
app.put('/api/users', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const user = {
    id: new ObjectId(req.body.id),
    name: req.body.name,
    age: req.body.age
  }
  app.locals.collection.findOneAndUpdate({
    _id: user.id
  }, {
    $set: {
      name: user.name,
      age: user.age
    }
  }, {
    returnOriginal: false
  }, (err, result) => {
    if (err) console.log(err);
    res.sendStatus(200);
  })
});

// DELETE USER
app.delete('/api/users/:id', (req, res) => {
  const id = new ObjectId(req.params.id);

  app.locals.collection.deleteOne({
    _id: id
  }, (err, result) => {
    if (err) return console.log(err);
    res.sendStatus(200);
  })
})

process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});