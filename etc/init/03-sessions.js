
// # sessions

var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var randomstring = require('randomstring-extended');
var validator = require('validator');
var _ = require('underscore');

exports = module.exports = function(IoC, settings, sessions) {

  var app = this;

  // pass a secret to cookieParser() for signed cookies
  app.use(cookieParser(settings.cookieParser));

  // add req.session cookie support
  settings.session.store = sessions;
  app.use(session(settings.session));

  // add flash message support
  app.use(flash());

};

exports['@require'] = [ '$container', 'igloo/settings', 'igloo/sessions' ];
