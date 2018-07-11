
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 2500;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 2500;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 2500;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  //res.send(req.params);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});


app.delete('/todos:/:id', (req, res) => {
  var id = req.params.id;
  //res.send(req.params);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  // User.findByToken
  // user.generateAuthToken


  user.save().then(() => {
    return user.generateAuthToken();
    // res.send(user);
  }).then ((token) => {
     res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};

// newTodo.save().then((doc) => {
//   console.log('Saved todo ', doc)
// }, (e) => {
//   console.log('Unable to save to do');
// });
