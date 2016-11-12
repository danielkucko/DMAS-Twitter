'use strict';

const Hapi = require('hapi');
const utils = require('./app/api/utils.js');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 4000 });

require('./app/models/db');

server.register([require('hapi-auth-jwt2')], err => {

  if (err) {
    throw err;
  }

});

server.auth.strategy('jwt', 'jwt', {
  key: 'supersecretpassword',
  validateFunc: utils.validate,
  verifyOptions: {algorithms: ['HS256']},
});

server.auth.default({
  strategy: 'jwt',
});

// server.route(require('./routes'));
server.route(require('./apiroutes'));

server.start(err => {
  if (err) {
    throw err;
  }

  console.log('Server listening at: ', server.info.uri);
});
