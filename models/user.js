const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    title: {
      type: String,
      required: true
  },
    files: [Object]
  });

module.exports = User = mongoose.model('user', UserSchema);