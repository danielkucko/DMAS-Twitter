const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createToken = function (user) {
  return jwt.sign({id: user.id, email: user.email, role: user.role}, 'supersecretpassword', {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

exports.decodeToken = function (token) {
  var userInfo = {};
  try {
    var decoded = jwt.verify(token, 'supersecretpassword');
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
    userInfo.role = decoded.role;
  } catch (e) {
  }

  return userInfo;
};

exports.validate = function (decoded, request, callback) {
  User.findOne({_id: decoded.id}).then(user => {
    if (user != null) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }).catch(err => {
    callback(null, false);
  });
};
