'use strict';

const UserApi = require('./app/api/userapi');
const TweetApi = require('./app/api/tweetapi');

module.exports = [
  { method: 'GET', path: '/api/users', config: UserApi.find },
  { method: 'GET', path: '/api/tweets', config: TweetApi.find },
];
