
// # package

var _ = require( 'underscore' );
var _str = require( 'underscore.string' );
_.mixin( _str.exports() );

var paginate = require( 'express-paginate' );
var async = require( 'async' );

exports = module.exports = function( Package ) {

  // Get 5 most popular packages
  function popular( req, res, next ) {
    req.query.limit = 5;

    listPaginated( req, res, next, {}, { sortBy: { views: -1 } });
  }

  // Get 5 latest packages
  function latest( req, res, next ) {
    req.query.limit = 5;

    listPaginated( req, res, next, {}, { sortBy: { created_at: -1 } });
  }

  function preview( req, res, next ) {
    var _package = new Package().simulateSettings( req.params.ids );

    if ( ! _package ) {
      return next( new Error('Package does not exist') );
    }

    // Return the package or render it
    res.format({
      html: function() {
        res.render( 'packages/show', {
          _package: _package
        });
      },
      json: function() {
        res.json( _package );
      }
    });
  }

  function create( req, res, next ) {
    if ( ! req.body.settings ) {
      return next({
        param: 'settings',
        message: 'Settings is missing or blank'
      });
    }

    // Find a better way to find if the string is valid json
    try {
      JSON.parse( req.body.settings );
    } catch( exception ) {
      return next({
        param: 'settings',
        message: 'Settings is invalid JSON'
      });
    }

    async.waterfall([
      // Check if a package with the same settings exists and if so redirect to that instead
      function findSimilarPackage( callback ) {
        Package.findOne({
          settings: req.body.settings
        }, callback );
      },

      // Create a package if a similar one doesn't exist
      function createPackageIfNecessary( similarPackage, callback ) {
        // If a similar package exists, return that instead
        if ( similarPackage ) {
          return callback( null, similarPackage );
        }

        Package.create({
          settings: req.body.settings,
          email: req.body.email
        }, callback );
      }
    ], function( err, _package ) {
      if ( err ) {
        return next( err );
      }

      // Redirect to packages or return it
      res.format({
        html: function() {
          req.flash( 'success', 'Successfully created package' );
          res.redirect( '/packages' );
        },
        json: function() {
          res.json( _package );
        }
      });
    });
  }

  function show( req, res, next ) {
    async.waterfall([
      // Find package and increment the number of views
      function findPackageAndIncrementViews( callback ) {
        Package.findOne( { slug: req.params.slug }, function( err, _package ) {
          if ( err ) {
            return callback( err );
          }

          if ( ! _package ) {
            return callback( new Error('Package does not exist') );
          }

          // Increment the number of views
          ++_package.views;

          _package.save( callback );
        });
      }
    ], function( err, _package ) {
      if ( err ) {
        return next( err );
      }

      // Return the package or render it
      res.format({
        html: function() {
          res.render( 'packages/show', {
            _package: _package
          });
        },
        json: function() {
          res.json( _package );
        }
      });
    });
  }

  function jshintrc( req, res, next ) {
    // Find package
    Package.findOne( { slug: req.params.slug }, function( err, _package ) {
      if ( err ) {
        return next( err );
      }

      if ( ! _package ) {
        return next( new Error('Package does not exist') );
      }

      var jshintContent = _package.jshintCode;

      // Send .jshintrc as a download
      //res.setHeader( 'Content-disposition', 'attachment; filename=.jshintrc' );
      res.setHeader( 'Content-type', 'text/plain' );
      res.setHeader( 'Content-length', jshintContent.length );
      res.write( jshintContent, 'binary' );
      res.end();
    });
  }

  //
  // Helper functions
  //

  function listPaginated( req, res, next, findOptions, extraOptions ) {
    Package.paginate( findOptions, req.query.page, req.query.limit, function( err, pageCount, packages, itemCount ) {
      if ( err ) {
        return next( err );
      }

      res.format({
        html: function() {
          res.status( 404 );
        },
        json: function() {
          // inspired by Stripe's API response for list objects
          res.json({
            object: 'list',
            has_more: paginate.hasNextPages( req )( pageCount, packages.length ),
            data: packages
          });
        }
      });
    }, extraOptions );
  }

  return {
    preview: preview,
    popular: popular,
    latest: latest,
    create: create,
    show: show,
    jshintrc: jshintrc
  };

};

exports['@singleton'] = true;
exports['@require'] = [ 'models/package' ];
