const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const newtodos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

 beforeEach((done) => {
   Todo.remove({}).then(() => {
     return Todo.insertMany(newtodos);
 }).then(() => done());
});

// describe('POST /todos', () => {
//   it('should create a new todo', (done) => {
//     var text = 'Test todo text';
//
//     request(app)
//     .post('/todos')
//     .send({text})
//     .expect(200)
//     .expect((res) => {
//        expect(res.body.text).toBe(text);
//     })
//     .end((err, res) => {
//       if (err) {
//         return done(err);
//       }
//       Todo.find().then((todos) => {
//          expect(todos.length).toBe(1);
//          expect(todos[0].text).toBe(text);
//          done();
//       }).catch((e) => done(e));
//     });
//   });
// });

//   it('should not create todo with invalid body data', ()=> {
//
//     request(app)
//     .post('/todos')
//     .send({})
//     .expect(400)
//     // .expect((res) => {
//     //    expect(res.body.text).toBe(text);
//     // })
//     .end((err, res) => {
//       if (err) {
//         return done(err);
//       }
//       Todo.find().then((todos) => {
//          expect(todos.length).toBe(0);
//          // expect(todos[0].text).toBe(text);
//          done();
//       }).catch((e) => done(e));
//     });
//   });
// });


describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${newtodos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(newtodos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
    .get('/todos/123abc')
    .expect(404)
    .end(done);
  });
});
