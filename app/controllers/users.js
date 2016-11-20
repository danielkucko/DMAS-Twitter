'use strict';

const User = require('../models/user');
const Tweet = require('../models/tweet');
const Comment = require('../models/comment');
const Joi = require('joi');

exports.home = {

  handler: function (request, reply) {

    reply.view('userhome', {
      title: "User administration", users: function () {
        User.find({}).sort([['joined', 'descending']]).then(users => {
          return users;
        })
      },
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
    User.remove({_id: request.payload}).then(users => {
      reply.redirect('/users/home');
    });
  }

};

exports.deleteTweets = {
  handler: function (request, reply) {
    Tweet.remove({author: request.payload}).then(tweets => {
      reply.redirect('/users/home')
    })
  }
};

exports.deleteComments = {
  handler: function (request, reply) {
    Comment.remove({author: request.payload}).then(comments => {
      reply.redirect('/users/home')
    })
  }
};
