
// app - routes - package

var express = require( 'express' );

exports = module.exports = function( IoC ) {

  var app = this;
  var router = express.Router();
  var controller = IoC.create( 'controllers/packages' );

  router.get(
    '/popular',
    controller.popular
  );

  router.get(
    '/latest',
    controller.latest
  );

  router.get(
    '/preview/:ids',
    controller.preview
  );

  router.post(
    '/',
    controller.create
  );

  app.get(
    '/:slug/jshintrc',
    controller.jshintrc
  );

  app.get(
    '/:slug',
    controller.show
  );

  app.use(
    '/packages',
    router
  );

};

exports['@require'] = [ '$container' ];
exports['@singleton'] = true;
