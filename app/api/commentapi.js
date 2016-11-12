'use strict';

const Comment = require('../models/comment');
const Boom = require('boom');

exports.find = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Comment.find({}).then(comments => {
      reply(comments);
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
    Comment.findOne({_id: request.params.id}).then(comment => {
      if (comment != null) {
        reply(comment);
      } else {
        reply(Boom.notFound('No comment with this id was found.'));
      }
    }).catch(err => {
      reply(Boom.notFound('No comment with this id was found.'));
    });
  },
};

exports.findByUser = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Comment.find({author: request.params.id}).then(comments => {
      reply(comments);
    }).catch(err => {
      reply(Boom.badImplementation('Error accessing database'));
    });
  },
};

exports.findByTweet = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Comment.find({tweet: request.params.id}).then(comments => {
      reply(comments);
    }).catch(err => {
      reply(Boom.badImplementation('Error accessing database'));
    });
  },
};

exports.create = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    const comment = new Comment(request.payload);
    comment.tweet = request.params.tid;
    comment.author = request.params.uid;
    comment.save().then(comment => {
      reply(comment).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('Error creating comment.'));
    });
  },
};

exports.deleteAll = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Comment.remove({}).then(comment => {
      reply().code(204);
    }).catch(err => {
      reply.badImplementation('Error removing comments.');
    });
  },
};

exports.deleteOne = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Comment.remove({_id: request.params.id}).then(comment => {
      reply(comment).code(204);
    }).catch(err => {
      reply(Boom.notFound('No comment with this id was found.'));
    });
  },
};

exports.deleteByUser = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Comment.remove({author: request.params.id}).then(comments => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.notFound('Error removing comments.'));
    });
  },
};

exports.deleteByTweet = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Comment.remove({tweet: request.params.id}).then(comments => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.notFound('Error removing comments.'));
    });
  },
};
