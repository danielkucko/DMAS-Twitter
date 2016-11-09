'use strict';

const SyncHttpService = require('./sync-http-client');
const baseUrl = 'http://localhost:4000';

class TwitterService {

  constructor(baseUrl) {
    this.httpService = new SyncHttpService(baseUrl);
  }

  getTweets() {
    return this.httpService.get('/api/tweets');
  }

  getTweet(id) {
    return this.httpService.get('/api/tweets/' + id);
  }

  getTweetByUser(id) {
    return this.httpService.get('/api/users/' + id + '/tweets');
  }

  createTweet(id, newTweet) {
    return this.httpService.post('/api/users/' + id + '/tweets', newTweet);
  }

  deleteAllTweets() {
    return this.httpService.delete('/api/tweets');
  }

  deleteOneTweet(id) {
    return this.httpService.delete('/api/tweets/' + id);
  }

  deleteTweetsByUser(id) {
    return this.httpService.delete('/api/users/' + id + '/tweets');
  }

  getUsers() {
    return this.httpService.get('/api/users');
  }

  getUser(id) {
    return this.httpService.get('/api/users/' + id);
  }

  createUser(newUser) {
    return this.httpService.post('/api/users', newUser);
  }

  deleteOneUser(id) {
    return this.httpService.delete('/api/users/' + id);
  }

  deleteAllUsers() {
    return this.httpService.delete('/api/users');
  }

  createComment(uid, tid, comment) {
    return this.httpService.post('/api/users/' + uid + '/tweets/' + tid + '/comments', comment);
  }

  getCommentsByUser(id) {
    return this.httpService.get('/api/users/' + id + '/comments');
  }

  getCommentsByTweet(id) {
    return this.httpService.get('/api/tweets/' + id + '/comments');
  }

  getComments() {
    return this.httpService.get('/api/comments');
  }

  getOneComment(id) {
    return this.httpService.get('/api/comments/' + id);
  }

  deleteAllComments() {
    return this.httpService.delete('/api/comments');
  }

  deleteComment(id) {
    return this.httpService.delete('/api/comments/' + id);
  }

  deleteCommentsByUser(id) {
    return this.httpService.delete('/api/users/' + id + '/comments');
  }

  deleteCommentsByTweet(id) {
    return this.httpService.delete('/api/tweets/' + id + '/comments');
  }

  login(user) {
    return this.httpService.setAuth('/api/users/authenticate', user);
  }

  logout() {
    this.httpService.clearAuth();
  }

}

module.exports = TwitterService;
