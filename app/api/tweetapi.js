'use strict';

const Tweet = require('../models/tweet');
const Boom = require('boom');

exports.find = {
  handler: function (request, reply) {
    Tweet.find({}).populate('author').populate('comments').then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.internal('Error connecting to database'));
    });
  },
};
