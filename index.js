'use strict';

const Hapi = require('hapi');
const utils = require('./app/api/utils.js');
const Handlebars = require('handlebars');
const HandlebarsIntl = require('handlebars-intl');
const corsHeaders = require('hapi-cors-headers');

var server = new Hapi.Server();
server.connection({port: process.env.PORT || 4000});

require('./app/models/db');

server.register([require('hapi-auth-jwt2'), require('hapi-auth-cookie'), require('inert'), require('vision')], err => {

  if (err) {
    throw err;
  }

  HandlebarsIntl.registerWith(Handlebars);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layout',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });

  server.auth.strategy('standard', 'cookie', {
    password: 'supersecretpasswordnotrevealedtoanyonewhatsoever',
    cookie: 'donation-cookie',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/login',
  });

  server.auth.strategy('jwt', 'jwt', {
    key: 'supersecretpassword',
    validateFunc: utils.validate,
    verifyOptions: {algorithms: ['HS256']},
  });

  server.auth.default({
    strategy: 'standard',
  });

  server.ext('onPreResponse', corsHeaders);
  server.route(require('./routes'));
  server.route(require('./apiroutes'));

  server.start(err => {
    if (err) {
      throw err;
    }

    console.log('Server listening at: ', server.info.uri);

  });

});
