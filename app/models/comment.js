'use strict';

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' },
  date: { type: Date, default: Date.now() },
  content: String,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
