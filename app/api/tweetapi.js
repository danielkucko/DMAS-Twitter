'use strict';

const Tweet = require('../models/tweet');
const Comment = require('../models/comment');
const CommentApi = require('./commentapi');
const Boom = require('boom');
const Utils = require('./utils');

exports.find = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.find({}).sort('-date').populate('author').populate('comments').then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('Error connecting to database'));
    });
  },
};

exports.findOne = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.findOne({_id: request.params.id}).then(tweet => {
      if (tweet != null) {
        reply(tweet);
      } else {
        reply(Boom.notFound('No tweet with this id was found.'));
      }
    }).catch(err => {
      reply(Boom.notFound('No tweet with this id was found.'));
    });
  },
};

exports.findByUser = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.find({author: request.params.id}).sort('-date').populate('author').then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('Error accessing the database'));
    });
  },
};

exports.create = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    const tweet = new Tweet(request.payload);
    tweet.author = Utils.decodeToken(request.headers.authorization.split(' ')[1]).userId;
    tweet.save().then(t => {
      Tweet.findOne({_id: t._id}).populate('author').then(retTweet => {
        reply(retTweet).code(201);
      });
    }).catch(err => {
      reply(Boom.badImplementation('Error creating tweet.'));
    });
  },
};

exports.deleteAll = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    if (Utils.checkPermission(null, request.headers.authorization.split(' ')[1])) {
      Tweet.remove({}).then(tweets => {
        reply().code(204);
      }).catch(err => {
        reply(Boom.badImplementation('Error removing tweets.'));
      });
    } else {
      reply(Boom.unauthorized('Unauthorized!'));
    }
  },
};

exports.deleteOne = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.findOne({_id: request.params.id}).then(tweet => {
      if (Utils.checkPermission(tweet.author, request.headers.authorization.split(' ')[1])) {
        Tweet.remove({_id: request.params.id}).then(tweet => {
          reply().code(204);
        }).catch(err => {
          reply(Boom.notFound('No tweet with this id was found.'));
        });
      } else {
        reply(Boom.unauthorized('Unauthorized!'));
      }
    }).catch(err => {
      reply(Boom.notFound('Tweet not found!'));
    });

  },
};

exports.deleteByUser = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {

    if (Utils.checkPermission(request.params.id, request.headers.authorization.split(' ')[1])) {
      Tweet.remove({author: request.params.id}).then(t => {
        reply().code(204);
      }).catch(err => {
        reply(Boom.badImplementation('Error removing tweets.'));
      });
    } else {
      reply(Boom.unauthorized('Unauthorized!'));
    }
  }
};
