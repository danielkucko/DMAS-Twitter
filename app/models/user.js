'use strict';

const mongoose = require('mongoose');
const Tweet = require('./tweet');
const Comment = require('./comment');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  joined: {type: Date, default: Date.now()}
});

userSchema.pre('remove', function (next) {
  Tweet.remove({author: this._id}).exec();
  Comment.remove({author: this._id}).exec();
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
