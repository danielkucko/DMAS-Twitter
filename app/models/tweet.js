'use strict';

const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  date: { type: Date, default: Date.now() },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
