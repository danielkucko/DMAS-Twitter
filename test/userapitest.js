'use strict';

const assert = require('chai').assert;
const TwitterService = require('./twitter-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const twitterService = new TwitterService(fixtures.twitterService);

  beforeEach(function () {
    twitterService.login(users[0]);
    //twitterService.deleteAllUsers();
  });

  afterEach(function () {
    //twitterService.deleteAllUsers();
    twitterService.logout();
  });

  test('create a user', function () {
    const returnedUser = twitterService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });

  test('get user', function () {
    const u1 = twitterService.createUser(newUser);
    const u2 = twitterService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });

  test('get invalid user', function () {
    const u1 = twitterService.getUser('1234');
    assert.isNull(u1);
    const u2 = twitterService.getUser('012345678901234567890123');
    assert.isNull(u2);
  });

  test('delete a user', function () {
    const u = twitterService.createUser(newUser);
    assert(twitterService.getUser(u._id) != null);
    twitterService.deleteOneUser(u._id);
    assert(twitterService.getUser(u._id) == null);
  });

  /*test('get all users', function () {
    for (let u of users) {
      twitterService.createUser(u);
    }

    const allUsers = twitterService.getUsers();
    assert.equal(allUsers.length, users.length);
   });*/

  test('get users detail', function () {
    for (let u of users) {
      twitterService.createUser(u);
    }

    const allUsers = twitterService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  });

  /*test('get all users empty', function () {
    const allUsers = twitterService.getUsers();
    assert.equal(allUsers.length, 0);
   });*/
});