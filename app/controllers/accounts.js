'use strict';

const User = require('../models/user');
const Joi = require('joi');

exports.main = {
  auth: false,
  handler: function (request, reply) {
    reply.view('main', {title: 'DMAS Twitter Admin Panel'});
  },

};

exports.login = {
  auth: false,
  handler: function (request, reply) {
    reply.view('login', {title: 'Login to the Admin Panel'});
  },

};

exports.logout = {
  auth: false,
  handler: function (request, reply) {
    request.cookieAuth.clear();
    reply.redirect('/');
  },

};

exports.authenticate = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
    failAction: function (request, reply, source, error) {
      reply.view('login', {
        title: 'Log in error',
        errors: error.data.details,
      }).code(400);
    },

    options: {
      abortEarly: false,
    },
  },
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    User.findOne({email: user.email}).then(foundUser => {
      if (foundUser && foundUser.password === user.password && foundUser.role === 'admin') {
        request.cookieAuth.set({
          loggedIn: true,
          loggedInUser: user.email,
        });
        reply.redirect('/home');
      } else {
        reply.view('login', {
          errors: [
            {message: 'Wrong Username or Password'},
          ],
        });
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },

};
