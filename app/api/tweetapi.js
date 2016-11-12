'use strict';

const Tweet = require('../models/tweet');
const Boom = require('boom');

exports.find = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.find({}).populate('author').populate('comments').then(tweets => {
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
    Tweet.find({author: request.params.id}).then(tweets => {
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
    tweet.author = request.params.id;
    tweet.save().then(tweet => {
      reply(tweet).code(201);
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
    Tweet.remove({}).then(tweets => {
      reply().code(204);
    }).catch(err => {
      reply.badImplementation('Error removing tweets.');
    });
  },
};

exports.deleteOne = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.remove({_id: request.params.id}).then(tweet => {
      reply(tweet).code(204);
    }).catch(err => {
      reply(Boom.notFound('No tweet with this id was found.'));
    });
  },
};

exports.deleteByUser = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.remove({author: request.params.id}).then(tweets => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('Error removing tweets.'));
    })
  }
};
