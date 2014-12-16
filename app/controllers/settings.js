
// # settings

var _ = require( 'underscore' );
var _str = require( 'underscore.string' );
_.mixin( _str.exports() );

exports = module.exports = function( settings ) {

  function index( req, res, next ) {
      res.format({
        html: function() {
          res.status( 404 );
        },
        json: function() {
          res.json( settings );
        }
      });
  }

  function grouped( req, res, next ) {
      res.format({
        html: function() {
          res.status( 404 );
        },
        json: function() {
          res.json( getGroupedSettings() );
        }
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

  return {
    index: index,
    grouped: grouped
  };

};

exports['@singleton'] = true;
exports['@require'] = [ 'models/settings' ];
