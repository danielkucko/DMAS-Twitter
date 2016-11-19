'use strict';

const Tweet = require('../models/tweet');
const Comment = require('../models/comment');
const Joi = require('joi');

exports.home = {

  handler: function (request, reply) {
    Tweet.find({}).sort([['date', 'descending']]).then(tweets => {
      reply.view('tweethome', {
        title: 'Tweet administration',
        tweets: tweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.search = {

  handler: function (request, reply) {
    let regExp = new RegExp('^' + request.payload + '$', 'i');
    Tweet.find({$or: [{content: regExp}, {author: regExp}]}).then(tweets => {
      reply.view('tweetsearch', {
        title: 'Search Results',
        tweets: tweets,
      });
    }).catch(err => {
      reply.redirect('/')
    })
  }

};

exports.deleteOne = {

  handler: function (request, reply) {
    Tweet.remove({_id: request.payload}).then(tweet => {
      reply.redirect('/tweets/home')
    })
  }
};

exports.deleteAll = {
  handler: function (request, reply) {
    Tweet.remove({}).then(tweets => {
      reply.redirect('/tweets/home')
    })
  }
};

exports.deleteComments = {
  handler: function (request, reply) {
    Comment.remove({tweet: request.payload}).then(comments => {
      reply.redirect('/tweets/home')
    })
  }
};
