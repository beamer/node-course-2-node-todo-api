var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var newTodo = new Todo({
  text: 'Cook dinner'
});
var otherTodo = new Todo({
  text: 'Feed cat',
  completed: false,
  completedAt: 123
});

module.exports = {Todo};
