'use strict';

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
// var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use(new Strategy(
  function(username, password, cb) {
    User.findOne({username: username}, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

module.exports = passport;