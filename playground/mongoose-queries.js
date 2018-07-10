const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '61b42e38fc34d20f4202b041e';
//
// Todo.find({
//   _id: id
// }).then ((todos) => {
//   if (todos.length < 1)
//    return(console.log('Id not found'));
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then ((todo) => {
//   console.log('Todo', todo);
// });

User.find({}, (err, docs) => {
  if (!err) {
    return(console.log(docs));
  } else {throw err;}
});

User.findById('5b440d939eba59352febb038').then((user) => {
  if (!user) {
    return console.log('Unable to find user ', user);
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
