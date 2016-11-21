const Accounts = require('./app/controllers/accounts');
const Tweets = require('./app/controllers/tweets');
const Assets = require('./app/controllers/assets');
const Comments = require('./app/controllers/comments');
const Users = require('./app/controllers/users');

module.exports = [

  {method: 'GET', path: '/', config: Accounts.main},
  {method: 'GET', path: '/login', config: Accounts.login},
  {method: 'POST', path: '/login', config: Accounts.authenticate},
  {method: 'GET', path: '/logout', config: Accounts.logout},

  {method: 'GET', path: '/tweets', config: Tweets.home},
  {method: 'POST', path: '/tweets/detail', config: Tweets.detail},
  {method: 'POST', path: '/tweets/search', config: Tweets.search},
  {method: 'POST', path: '/tweets/delete', config: Tweets.deleteOne},
  {method: 'POST', path: '/tweets/deleteAll', config: Tweets.deleteAll},
  {method: 'POST', path: '/tweets/deleteComments', config: Tweets.deleteComments},

  {method: 'GET', path: '/users', config: Users.home},
  {method: 'POST', path: '/users/detail', config: Users.detail},
  {method: 'POST', path: '/users/search', config: Users.search},
  {method: 'POST', path: '/users/delete', config: Users.deleteOne},
  {method: 'POST', path: '/users/deleteTweets', config: Users.deleteTweets},
  {method: 'POST', path: '/users/deleteComments', config: Users.deleteComments},

  {method: 'GET', path: '/comments', config: Comments.home},
  {method: 'POST', path: '/comments/search', config: Comments.search},
  {method: 'POST', path: '/comments/delete', config: Comments.deleteOne},
  {method: 'POST', path: '/comments/deleteAll', config: Comments.deleteAll},

  {
    method: 'GET',
    path: '/{param*}',
    config: {auth: false},
    handler: Assets.servePublicDirectory,
  },

];
