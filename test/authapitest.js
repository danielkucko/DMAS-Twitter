'use strict';

const assert = require('chai').assert;
const TwitterService = require('./twitter-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils.js');

suite('Auth API tests', function () {

  let users = fixtures.users;
  let tweets = fixtures.tweets;

  const donationService = new TwitterService(fixtures.twitterService);

  test('login-logout', function () {
    var returnedTweets = donationService.getTweets();
    assert.isNull(returnedTweets);

    const response = donationService.login(users[0]);
    returnedTweets = donationService.getTweets();
    assert.isNotNull(returnedTweets);

    donationService.logout();
    returnedTweets = donationService.getTweets();
    assert.isNull(returnedTweets);
  });
});