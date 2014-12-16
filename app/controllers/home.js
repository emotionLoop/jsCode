
// # home

var async = require( 'async' );

exports = module.exports = function( Package, settings ) {

  function home( req, res, next ) {
    var popularPackages = [];
    var latestPackages = [];

    async.waterfall([
      // Fetch popular packages
      function fetchPopularPackages( callback ) {
        Package
          .find()
          .limit( 5 )
          .sort( '-views' )
          .exec( function( err, packages ) {
            if ( err ) {
              return callback( err );
            }

            popularPackages = packages;

            callback( err );
          });
      },

      // Fetch latest packages
      function fetchLatestPackages( callback ) {
        Package
          .find()
          .limit( 5 )
          .sort( '-created_at' )
          .exec( function( err, packages ) {
            if ( err ) {
              return callback( err );
            }

            latestPackages = packages;

            callback( err );
          });
      }
    ], function( err ) {
      if ( err ) {
        return next( new Error(err) );
      }

      res.format({
        html: function() {
          res.render( 'home', {
            settings: getGroupedSettings(),
            popularPackages: popularPackages,
            latestPackages: latestPackages
          });
        },
        json: function() {
          res.status( 200 ).end();
        }
      });
    });
  }

  //
  // Helper functions
  //

  // Group settings into different groups, for the front-end
  function getGroupedSettings() {
    var groupedSettings = [];
    var lastGroup = {
        name: '',
        settings: []
      };

    settings.forEach( function( setting, index ) {
      if ( setting.group !== lastGroup.name ) {
        if ( index !== 0 ) {
          groupedSettings.push( cloneMe(lastGroup) );
        }

        lastGroup = {
          name: setting.group,
          settings: []
        };
      }

      lastGroup.settings.push( cloneMe(setting) );
    });

    groupedSettings.push( cloneMe(lastGroup) );

    return groupedSettings;
  }

  // Clone an object
  function cloneMe( objectToClone ) {
    return JSON.parse( JSON.stringify(objectToClone) );
  }

  return home;

};

exports['@singleton'] = true;
exports['@require'] = [ 'models/package', 'models/settings' ];