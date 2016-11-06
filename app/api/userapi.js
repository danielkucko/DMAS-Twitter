'use strict';

const User = require('../models/user');
const Boom = require('boom');

exports.find = {
  handler: function (request, reply) {
    User.find({}).then(user => {
      reply(user);
    }).catch(err => {
      reply(Boom.internal('Error connecting to database'));
    });
  },
};
