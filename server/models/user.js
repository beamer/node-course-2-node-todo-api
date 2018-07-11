var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [ {
    access : {
      type: String,
      required: true
    },
    token: {
    type: String,
    required: true,
    }
   }]
}, {
  usePushEach: true
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  //console.log(token);
  var mytoken = {access: access, token: token};


  try {
   user.tokens.push({access, token});
 } catch (e) {
   console.log(e);
 }
  // user.tokens[0].access = access;
  // user.tokens[0].token = token;
  //user.tokens.push({access, token});

   //
   // user.findByIdAndUpdate(
   //   {id: user._id},
   //   {$push: {"tokens": {access, token}}},
   //   function (error, success) {
   //     if (error) {
   //       console.log('err' + error);
   //     } else {
   //       console.log('ok' + success);
   //     }
   //   }
   // );
//  console.log('inside ', user);
  user.save().then((user) => {
  }).then ((user) => {
  }).catch((e) => {
    console.log('error ', e);
  });

  return token;
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
     } catch (e) {
       return Promise.reject();
     }
   return User.findOne({
     '_id': decoded._id,
     'tokens.token': token,
     'tokens.access': 'auth'
   });
};

var User = mongoose.model('User', UserSchema);
module.exports = {User};
