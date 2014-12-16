
// app - routes - settings

var express = require( 'express' );

exports = module.exports = function( IoC ) {

  var app = this;
  var router = express.Router();
  var controller = IoC.create( 'controllers/settings' );

  router.get(
    '/',
    controller.index
  );

  router.get(
    '/grouped',
    controller.grouped
  );

  app.use(
    '/settings',
    router
  );

};

exports['@require'] = [ '$container' ];
exports['@singleton'] = true;
