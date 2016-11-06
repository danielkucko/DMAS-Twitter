'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastNae: String,
  email: String,
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
  password: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
