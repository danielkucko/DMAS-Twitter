'use strict';

const Comment = require('../models/comment');
const Boom = require('boom');

exports.find = {
  handler: function (request, reply) {
    Comment.find({}).then(comments => {
      reply(comments);
    }).catch(err => {
      reply(Boom.badImplementation('Error connecting to database'));
    });
  },
};

exports.findOne = {
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

exports.create = {
  handler: function (request, reply) {
    const comment = new Comment(request.payload);
    comment.save().then(comment => {
      reply(comment).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('Error creating comment.'));
    });
  },
};

exports.deleteAll = {
  handler: function (request, reply) {
    Comment.remove({}).then(comment => {
      reply().code(204);
    }).catch(err => {
      reply.badImplementation('Error removing comments.');
    });
  },
};

exports.deleteOne = {
  handler: function (request, reply) {
    Comment.remove({_id: request.params.id}).then(comment => {
      reply(comment).code(204);
    }).catch(err => {
      reply(Boom.notFound('No comment with this id was found.'));
    });
  },
};
