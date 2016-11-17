'use strict';

const User = require('../models/user');
const Tweet = require('../models/tweet');
const Comment = require('../models/comment');
const Boom = require('boom');
const utils = require('./utils.js');

exports.find = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    User.find({}).then(users => {
      reply(users);
    }).catch(err => {
      reply(Boom.badImplementation('Error connecting to database.'));
    });
  },
};

exports.findOne = {

  auth: {
    strategy: 'jwt',
  },

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

  auth: {
    strategy: 'jwt',
  },

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

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    if (utils.checkPermission(null, request.headers.authorization.split(' ')[1])) {
      User.remove({}).then(users => {
        Tweet.remove({}).then(tweets => {
          Comment.remove({}).then(comments => {

          }).catch(err => {
            reply(Boom.badImplementation('Error removing Comments'))
          });
        }).catch(err => {
          reply(Boom.badImplementation('Error removing Tweets'))
        });
        reply().code(204);
      }).catch(err => {
        reply(Boom.badImplementation('Error removing users.'));
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
    if (utils.checkPermission(request.params.id, request.headers.authorization.split(' ')[1])) {
      User.find({_id: request.params.id}).then(user => {
        Comment.remove({author: user._id}).then(comments => {
          Tweet.remove({author: user._id}).then(tweets => {
          }).catch(reply(Boom.badImplementation('Error removing tweets.')));
        }).catch(reply(Boom.badImplementation('Error removing comments.')));
        User.remove({_id: request.params.id}).then(user => {
          reply(user).code(204);
        }).catch(err => {
          reply(Boom.notFound('No user with this id was found.'));
        });
      })
    } else {
      reply(Boom.unauthorized('Unauthorized!'));
    }
  },
};

exports.authenticate = {
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    User.findOne({email: user.email}).then(foundUser => {
      if (foundUser && foundUser.password === user.password) {
        const token = utils.createToken(foundUser);
        reply({success: true, token: token}).code(201);
      } else {
        reply({success: false, message: 'Authentication failed. User not found.'}).code(201);
      }
    }).catch(err => {
      reply(Boom.notFound('internal db failure'));
    });
  },

};
