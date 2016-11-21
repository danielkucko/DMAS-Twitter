'use strict';

const User = require('../models/user');
const Tweet = require('../models/tweet');
const Comment = require('../models/comment');
const Joi = require('joi');

exports.home = {

  handler: function (request, reply) {

    User.find({}).sort([['joined', 'descending']]).then(users => {
      reply.view('userhome', {
        title: "User administration", users: users
      })
    })
  },

};

exports.detail = {

  handler: function (request, reply) {

    User.findOne({_id: request.payload.id}).then(user => {
      Comment.find({author: user._id}).sort([['date', 'ascending']]).populate('author').then(comments => {
        Tweet.find({author: user._id}).sort([['date', 'ascending']]).populate('author').then(tweets => {
          reply.view('userdetail', {
            title: 'User Detail',
            user: user,
            comments: comments,
            tweets: tweets
          })
        })
      })
    })
  }
};

exports.search = {

  handler: function (request, reply) {

    let regExp = new RegExp('^' + request.payload + '$', 'i');
    reply.view('usersearch', {
      title: "Search Results", users: function () {
        User.find({$or: [{firstName: regExp}, {lastName: regExp}, {email: regExp}]}).then(users => {
          return users;
        })
      }
    })

  }

};

exports.deleteOne = {

  handler: function (request, reply) {
    User.remove({_id: request.payload.id}).then(users => {
      reply.redirect('/users');
    });
  }

};

exports.deleteTweets = {
  handler: function (request, reply) {
    Tweet.remove({author: request.payload.id}).then(tweets => {
      reply.redirect('/users')
    })
  }
};

exports.deleteComments = {
  handler: function (request, reply) {
    Comment.remove({author: request.payload.id}).then(comments => {
      reply.redirect('/users')
    })
  }
};
