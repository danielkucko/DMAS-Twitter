'use strict';

const Tweet = require('../models/tweet');
const Boom = require('boom');

exports.find = {
  handler: function (request, reply) {
    Tweet.find({}).populate('author').populate('comments').then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('Error connecting to database'));
    });
  },
};

exports.findOne = {
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
  handler: function (request, reply) {
    Tweet.find({author: request.params.id}).then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('Error accessing the database'));
    });
  },
};

exports.create = {
  handler: function (request, reply) {
    const tweet = new Tweet(request.payload);
    tweet.save().then(tweet => {
      reply(tweet).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('Error creating tweet.'));
    });
  },
};

exports.deleteAll = {
  handler: function (request, reply) {
    Tweet.remove({}).then(tweets => {
      reply().code(204);
    }).catch(err => {
      reply.badImplementation('Error removing tweets.');
    });
  },
};

exports.deleteOne = {
  handler: function (request, reply) {
    Tweet.remove({_id: request.params.id}).then(tweet => {
      reply(tweet).code(204);
    }).catch(err => {
      reply(Boom.notFound('No tweet with this id was found.'));
    });
  },
};

exports.deleteByUser = {
  handler: function (request, reply) {
    Tweet.remove({author: request.params.id}).then(tweets => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('Error removing tweets.'));
    })
  }
}
