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

exports.search = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    User.find({
      $or: [{firstName: new RegExp('^' + request.payload + '$', 'i')},
        {lastName: new RegExp('^' + request.payload + '$', i)}]
    }).then(
        users => {
          reply(users);
        }).catch(err => {
      reply(Boom.notFound('Your search did not find any results'));
    })
  }

};

exports.getLoggedInUser = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    let user = utils.decodeToken(request.headers.authorization.split(' ')[1]);
    User.findOne({_id: user.userId}).then(user => {
      if (user != null) {
        reply(user);
      } else {
        reply(Boom.notFound('No user with this id.'));
      }
    }).catch(err => {
      reply(Boom.notFound('No user with this id was found.'));
    })
  }

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

exports.update = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    let update = request.payload;
    User.findById(update._id).then(user => {
      user.firstName = update.firstName;
      user.lastName = update.lastName;
      user.password = update.password;
      user.email = update.email;
      user.save().then(user => {
        reply(user).code(201);
      }).catch(err => {
        reply(Boom.badImplementation('Error creating user.'));
      });
    }).catch(err => {
      reply(Boom.notFound('No user with this id was found.'))
    })
  }

};

exports.create = {

  auth: false,

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
      User.remove({_id: request.params.id}).then(user => {
        reply(user).code(204);
      }).catch(err => {
        reply(Boom.notFound('No user with this id was found.'));
      });

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
