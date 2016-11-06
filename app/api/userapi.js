'use strict';

const User = require('../models/user');
const Boom = require('boom');

exports.find = {
  handler: function (request, reply) {
    User.find({}).then(users => {
      reply(users);
    }).catch(err => {
      reply(Boom.badImplementation('Error connecting to database.'));
    });
  },
};

exports.findOne = {
  handler: function (request, reply) {
    User.findOne({_id: request.params.id}).then(user => {
      if (user != null) {
        reply(user);
      } else {
        reply(Boom.notFound('No user with this id.'));
      }
    }).catch(err => {
      reply(Boom.notFound('No user with this id was found.'));
    });
  },
};

exports.create = {
  handler: function (request, reply) {
    const user = new User(request.payload);
    user.save().then(user => {
      reply(user).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('Error creating user.'));
    });
  },
};

exports.deleteAll = {
  handler: function (request, reply) {
    User.remove({}).then(users => {
      reply().code(204);
    }).catch(err => {
      reply.badImplementation('Error removing users.');
    });
  },
};

exports.deleteOne = {
  handler: function (request, reply) {
    User.remove({_id: request.params.id}).then(user => {
      reply(user).code(204);
    }).catch(err => {
      reply(Boom.notFound('No user with this id was found.'));
    });
  },
};
