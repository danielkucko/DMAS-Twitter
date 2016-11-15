'use strict';

const assert = require('chai').assert;
const TwitterService = require('./twitter-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

  let newUser = fixtures.newUser;
  let newTweet = fixtures.newTweet;
  let newComment = fixtures.newComment;
  let users = fixtures.users;
  let tweets = fixtures.tweets;
  let comments = fixtures.comments;

  const twitterService = new TwitterService(fixtures.twitterService);

  beforeEach(function () {
    twitterService.login(users[1]);
    twitterService.deleteAllTweets();
    twitterService.deleteAllComments();
    twitterService.logout();
    twitterService.login(users[0]);
  });

  afterEach(function () {
    twitterService.login(users[1]);
    twitterService.deleteAllTweets();
    twitterService.deleteAllComments();
    twitterService.logout();
  });

  test('create a comment', function () {
    const returnedTweet = twitterService.createTweet(newTweet);
    const returnedComment = twitterService.createComment(returnedTweet._id, newComment);
    assert(_.some([returnedComment], newComment), 'returnedComment must be a superset of newComment');
    assert.isDefined(returnedComment._id);
  });

  test('get comment', function () {
    const t = twitterService.createTweet(newTweet);
    const c1 = twitterService.createComment(t._id, newComment);
    const c2 = twitterService.getOneComment(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid comment', function () {
    const u1 = twitterService.getOneComment('1234');
    assert.isNull(u1);
    const u2 = twitterService.getOneComment('012345678901234567890123');
    assert.isNull(u2);
  });

  test('delete a comment', function () {
    const t = twitterService.createTweet(newTweet);
    const c = twitterService.createComment(t._id, newComment);
    assert(twitterService.getOneComment(c._id) != null);
    twitterService.deleteComment(c._id);
    assert(twitterService.getOneComment(c._id) == null);
  });

  test('get all comments', function () {
    const t = twitterService.createTweet(newTweet);
    for (let c of comments) {
      twitterService.createComment(t._id, c);
    }

    const allComments = twitterService.getComments();
    assert.equal(allComments.length, comments.length);
  });

  test('get all comments empty', function () {
    const allComments = twitterService.getComments();
    assert.equal(allComments.length, 0);
  });

  test('get comments by user', function () {
    const u = twitterService.createUser(newUser);
    twitterService.logout();
    twitterService.login(newUser);
    const t = twitterService.createTweet(newTweet);
    const c = twitterService.createComment(t._id, newComment);
    const c1 = twitterService.getCommentsByUser(u._id);
    twitterService.logout();
    assert.deepEqual(c, c1[0]);
  });

  test('delete comments by user', function () {
    const u = twitterService.createUser(newUser);
    twitterService.logout();
    twitterService.login(newUser);
    const t = twitterService.createTweet(newTweet);
    const c = twitterService.createComment(t._id, newComment);
    assert(twitterService.getOneComment(c._id) != null);
    twitterService.deleteCommentsByUser(u._id);
    twitterService.logout();
    assert(twitterService.getOneComment(c._id) == null);
  });

  test('get comments by tweet', function () {
    const t = twitterService.createTweet(newTweet);
    const c = twitterService.createComment(t._id, newComment);
    const c1 = twitterService.getCommentsByTweet(t._id);
    assert.deepEqual(c, c1[0]);
  });

  test('delete comments by tweet', function () {
    const t = twitterService.createTweet(newTweet);
    const c = twitterService.createComment(t._id, newComment);
    assert(twitterService.getOneComment(c._id) != null);
    twitterService.deleteCommentsByTweet(t._id);
    assert(twitterService.getOneComment(c._id) == null);
  });

});