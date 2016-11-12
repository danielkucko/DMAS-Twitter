'use strict';

const assert = require('chai').assert;
const TwitterService = require('./twitter-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

  let newUser = fixtures.newUser;
  let newTweet = fixtures.newTweet;
  let tweets = fixtures.tweets;
  let users = fixtures.users;

  const twitterService = new TwitterService(fixtures.twitterService);

  beforeEach(function () {
    twitterService.login(users[0]);
    twitterService.deleteAllTweets();
  });

  afterEach(function () {
    twitterService.deleteAllTweets();
    twitterService.logout();
  });

  test('create a tweet', function () {
    const returnedUser = twitterService.createUser(newUser);
    const returnedTweet = twitterService.createTweet(returnedUser._id, newTweet);
    assert(_.some([returnedTweet], newTweet), 'returnedTweet must be a superset of newTweet');
    assert.isDefined(returnedTweet._id);
  });

  test('get tweet', function () {
    const returnedUser = twitterService.createUser(newUser);
    const t1 = twitterService.createTweet(returnedUser._id, newTweet);
    const t2 = twitterService.getTweet(t1._id);
    assert.deepEqual(t1, t2);
  });

  test('get invalid tweet', function () {
    const u1 = twitterService.getTweet('1234');
    assert.isNull(u1);
    const u2 = twitterService.getTweet('012345678901234567890123');
    assert.isNull(u2);
  });

  test('delete a tweet', function () {
    const u = twitterService.createUser(newUser);
    const t = twitterService.createTweet(u._id, newTweet);
    assert(twitterService.getTweet(t._id) != null);
    twitterService.deleteOneTweet(t._id);
    assert(twitterService.getTweet(t._id) == null);
  });

  test('get all tweets', function () {
    const u = twitterService.createUser(newUser);
    for (let t of tweets) {
      twitterService.createTweet(u._id, t);
    }

    const allTweets = twitterService.getTweets();
    assert.equal(allTweets.length, tweets.length);
  });

  test('get all tweets empty', function () {
    const allTweets = twitterService.getTweets();
    assert.equal(allTweets.length, 0);
  });

  test('get tweet by user', function () {
    const u = twitterService.createUser(newUser);
    const t = twitterService.createTweet(u._id, newTweet);
    const t1 = twitterService.getTweetByUser(u._id);
    assert.deepEqual(t, t1[0]);
  });

  test('delete tweet by user', function () {
    const u = twitterService.createUser(newUser);
    const t = twitterService.createTweet(u._id, newTweet);
    assert(twitterService.getTweet(t._id) != null);
    twitterService.deleteTweetsByUser(u._id);
    assert(twitterService.getTweet(t._id) == null);
  })

});