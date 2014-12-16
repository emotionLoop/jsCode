
// app - routes

var bootable = require( 'bootable' );
var serveStatic = require( 'serve-static' );

exports = module.exports = function( IoC, settings ) {

  var app = this;

  // home
  app.phase( bootable.di.routes('./routes/home.js') );

  // settings
  app.phase( bootable.di.routes('./routes/settings.js') );

  // packages
  app.phase( bootable.di.routes('./routes/packages.js') );

  // keep these last
  app.phase( function() {

    // static server
    app.use( serveStatic(settings.publicDir, settings.staticServer) );

    // error handler
    var errorHandler = IoC.create( 'igloo/error-handler' );
    app.use( errorHandler );

  });

};

exports['@require'] = [ '$container', 'igloo/settings' ];
