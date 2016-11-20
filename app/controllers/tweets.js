'use strict';

const Tweet = require('../models/tweet');
const Comment = require('../models/comment');
const Joi = require('joi');

exports.home = {

  handler: function (request, reply) {
    Tweet.find({}).sort([['date', 'descending']]).populate('author').then(tweets => {
      reply.view('tweethome', {
        title: 'Tweet administration',
        tweets: tweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.detail = {

  handler: function (request, reply) {
    Comment.find({tweet: request.payload.id}).sort([['date', 'ascending']])
        .populate('author').then(comments => {

      return comments;
    }).then(comments => {
      Tweet.findOne({_id: request.payload.id}).populate('author').then(tweet => {
        reply.view('tweetdet', {title: 'Tweet Details', tweet: tweet, cmts: comments})
      })
    })
  }

};

exports.search = {

  handler: function (request, reply) {
    let regExp = new RegExp('^' + request.payload + '$', 'i');
    Tweet.find({$or: [{content: regExp}, {author: regExp}]}).populate('author').then(tweets => {
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
    Tweet.remove({_id: request.payload.id}).then(tweet => {
      reply.redirect('/tweets');
    }).catch(err => {
      reply.redirect('/');
    })
  }
};

exports.deleteAll = {
  handler: function (request, reply) {
    Tweet.remove({}).then(tweets => {
      reply.redirect('/tweets')
    })
  }
};

exports.deleteComments = {
  handler: function (request, reply) {
    Comment.remove({tweet: request.payload.id}).then(comments => {
      reply.redirect('/tweets')
    })
  }
};
