'use strict';

const Comment = require('../models/comment');
const Joi = require('joi');

exports.home = {

  handler: function (request, reply) {
    Comment.find({}).sort([['date', 'descending']]).then(comments => {
      reply.view('commenthome', {
        title: 'Comment administration',
        comments: comments,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.search = {

  handler: function (request, reply) {
    let regExp = new RegExp('^' + request.payload + '$', 'i');
    Comment.find({$or: [{content: regExp}, {author: regExp}]}).then(comments => {
      reply.view('tweetsearch', {
        title: 'Search Results',
        comments: comments,
      });
    }).catch(err => {
      reply.redirect('/')
    })
  }

};

exports.deleteOne = {

  handler: function (request, reply) {
    Comment.remove({_id: request.payload}).then(comment => {
      reply.redirect('/tweets/home')
    })
  }
};

exports.deleteAll = {
  handler: function (request, reply) {
    Comment.remove({}).then(comments => {
      reply.redirect('/tweets/home')
    })
  }
};
