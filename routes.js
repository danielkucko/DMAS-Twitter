const Accounts = require('./app/controllers/accounts');
const Tweets = require('./app/controllers/tweets');
const Assets = require('./app/controllers/assets');
const Comments = require('./app/controllers/comments');

module.exports = [

  {method: 'GET', path: '/', config: Accounts.main},
  {method: 'GET', path: '/login', config: Accounts.login},
  {method: 'POST', path: '/login', config: Accounts.authenticate},
  {method: 'GET', path: '/logout', config: Accounts.logout},

  {method: 'GET', path: '/home', config: Tweets.home},
  {method: 'GET', path: '/report', config: Tweets.report},

  {
    method: 'GET',
    path: '/{param*}',
    config: {auth: false},
    handler: Assets.servePublicDirectory,
  },

];
