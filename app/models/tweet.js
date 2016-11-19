'use strict';

const mongoose = require('mongoose');
const Comment = require('./comment');

const tweetSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  date: { type: Date, default: Date.now() },
});

tweetSchema.pre('remove', function (next) {
  Comment.remove({tweet: this._id}).exec();
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
