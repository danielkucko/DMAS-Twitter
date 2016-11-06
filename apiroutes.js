'use strict';

const UserApi = require('./app/api/userapi');
const TweetApi = require('./app/api/tweetapi');
const CommentApi = require('./app/api/commentapi');

module.exports = [
  { method: 'GET', path: '/api/users', config: UserApi.find },
  {method: 'GET', path: '/api/users/{id}', config: UserApi.findOne},
  {method: 'POST', path: '/api/users', config: UserApi.create},
  {method: 'DELETE', path: '/api/users/{id}', config: UserApi.deleteOne},
  {method: 'DELETE', path: '/api/users', config: UserApi.deleteAll},

  { method: 'GET', path: '/api/tweets', config: TweetApi.find },
  {method: 'GET', path: '/api/tweets/{id}', config: TweetApi.findOne},
  {method: 'POST', path: '/api/tweets', config: TweetApi.create},
  {method: 'DELETE', path: '/api/tweets/{id}', config: TweetApi.deleteOne},
  {method: 'DELETE', path: '/api/tweets', config: TweetApi.deleteAll},

  {method: 'GET', path: '/api/comments', config: CommentApi.find},
  {method: 'GET', path: '/api/comments/{id}', config: CommentApi.findOne},
  {method: 'POST', path: '/api/comments', config: CommentApi.create},
  {method: 'DELETE', path: '/api/comments/{id}', config: CommentApi.deleteOne},
  {method: 'DELETE', path: '/api/comments', config: CommentApi.deleteAll},
];
