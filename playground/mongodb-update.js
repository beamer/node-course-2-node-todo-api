const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb');
  }
  console.log('Connected Successfully');

  db.collection('Todos').findOneAndUpdate({
   _id: new ObjectID('5b4093859eba59352feba49e')
 }, {
   $set: {
       text: 'Yahoo'
   }
    //text:'something'}
}, { returnOriginal: false
   }).then ((result) => {
     console.log(result);
   }, (err) => {
     console.log(err);
   });
//  db.close();
});
