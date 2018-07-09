const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb');
  }
  console.log('Connected Successfully');

  // delete many
  // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });
  // delete done
  // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // findOneAndDelete
     db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
       console.log(result);
     });

//  db.close();
});
