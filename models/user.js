const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  createdOn: Date
});

const User = mongoose.model('User', userSchema);

function findUserByEmail(email, callback) {
  User.findOne({ 'email': email }, callback);
}

function findUserById(id, callback) {
  User.findOne({ 'id': id }, callback);
}

function createUser(email, name, password, callback) {
  const user = new User({
    'email': email,
    'name': name,
    'password': password
  });

  user.save(callback);
}

module.exports = { User, findUserById, findUserByEmail, createUser };
