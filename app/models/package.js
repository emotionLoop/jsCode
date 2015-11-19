
// # package

var jsonSelect = require( 'mongoose-json-select' );
var mongoosePaginate = require( 'mongoose-paginate' );
var crypto = require( 'crypto' );
var uuid = require( 'uuid' );
var fs = require( 'fs' );
var path = require( 'path' );
var ejs = require( 'ejs' );
var _ = require( 'underscore' );

exports = module.exports = function( mongoose, iglooMongoosePlugin, settings ) {

  var Package = new mongoose.Schema({
    slug: {
      type: String
    },
    settings: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    email: {
      type: String
    }
  });

  // virtuals
  Package.virtual( 'object' ).get( function() {
    return 'package';
  });

  Package.virtual( 'convertedSettings' ).get( function () {
    return convertSettings( this.settings );
  });

  Package.virtual( 'sampleCode' ).get( function () {
    return getSampleCode( this.convertedSettings );
  });

  Package.virtual( 'jshintCode' ).get( function () {
    return getJSHintCode( this.convertedSettings );
  });

  // plugins
  Package.plugin( jsonSelect, '-email' );
  Package.plugin( mongoosePaginate );

  // keep last
  Package.plugin( iglooMongoosePlugin );

  // Generate a unique random slug when saving
  Package.pre( 'save', true, function ( next, done ) {
    var self = this;

    // Only generate a new slug if the package doesn't have one
    if ( this.slug ) {
      next();
      return done();
    }

    var slugSeed = uuid.v4();
    var newSlug = crypto.createHash( 'sha1' ).update( slugSeed ).digest( 'hex' );
    var lastSlugSize = 6;
    var maxSlugSize = 10;
    var finalSlug = newSlug.substr( 0, lastSlugSize );

    // Check if a package with the same slug exists
    function lookForSlugUniqueness() {
      mongoose.models.Package.find({ slug: finalSlug }, checkSlugResults );
    }

    // Check the results of looking for a package with the same slug
    function checkSlugResults( err, matchingPackages ) {

      // No package found, go ahead and return the slug
      if ( ! matchingPackages || matchingPackages.length === 0 ) {
        self.slug = finalSlug;
        return done( null );
      }

      // Otherwise try increasing the size of the slug
      // The slug length should increase only if the first 6 characters correspond to an already existing slug
      ++lastSlugSize;

      // If we have reached the full length of the slug already, generate a new one and try again
      if ( lastSlugSize > maxSlugSize ) {
        newSlug = crypto.createHash( 'sha1' ).update( slugSeed ).digest( 'hex' );
        lastSlugSize = 6;
      }

      finalSlug = newSlug.substr( 0, lastSlugSize );

      lookForSlugUniqueness();
    }

    lookForSlugUniqueness();

    next();
  });

  //
  // Helper methods
  //

  // Get an unsaved package with settings grouped and sorted properly, in JSON format, simulating a package's settings
  Package.methods.simulateSettings = function( stringOfSettingIds ) {
    var arrayOfSettingIds = stringOfSettingIds.split( ',' );

    this.settings = '{}';

    // Parse the ids to Numbers
    arrayOfSettingIds = _.map( arrayOfSettingIds, function( id ) {
      return parseInt( id );
    });

    // Get an array of the settings that were sent in stringOfSettingIds
    var matchingSettings = _.filter( settings, function( setting ) {
      if ( arrayOfSettingIds.indexOf(setting.id) !== -1 ) {
        return true;
      }

      return false;
    });

    // Return nothing if nothing matched
    if ( ! matchingSettings || ! matchingSettings.length ) {
      return this;
    }

    var finalSettings = {};

    // Now we need to "convert" the settings into minimal JSON, like the packages have it
    matchingSettings.forEach( function( setting ) {
      finalSettings[ setting.group ] = setting.name;
    });

    var jsonSettings = JSON.stringify( finalSettings );

    this.settings = jsonSettings;

    return this;
  };

  //
  // Helper functions
  //

  // Convert the package settings from an object into an array with "real" settings
  function convertSettings( settingsJSON ) {
    var chosenSettings = JSON.parse( settingsJSON );
    var finalSettings = [];

    settings.forEach( function( setting ) {
      // If the package has this setting chosen, add it to finalSettings array
      if ( chosenSettings.hasOwnProperty(setting.group) && chosenSettings[setting.group] === setting.name ) {
        finalSettings.push( setting );
      }
    });

    return finalSettings;
  }

  // Get Sample Code from a package settings array
  function getSampleCode( convertedSettings ) {
    // If there are no settings, return an empty string
    if ( convertedSettings.length === 0 ) {
      return '';
    }

    //
    // Define the template options
    //

    var options = {};

    // Options: Indentation
    if ( convertedSettings[0] && convertedSettings[0].name === 'indentation_spaces' ) {
      // Space
      options.space = ' ';
    } else {
      // Tab
      options.space = '\t';
    }

    // Options: Spacing
    if ( convertedSettings[1] && convertedSettings[1].name === 'spacing_2_spaces' ) {
      // 2 Spaces
      if ( options.space === ' ' ) {
        options.indentation = '  ';
      } else {
        options.indentation = '\t';
      }
    } else {
      // 4 Spaces
      if ( options.space === ' ' ) {
        options.indentation = '    ';
      } else {
        options.indentation = '\t';
      }
    }

    // Alias for indentation, so it's not impossible to work on sampleCode.ejs
    options.i = options.indentation;

    // Options: Readability
    if ( convertedSettings[2] && convertedSettings[2].name === 'readability_jumbo' ) {
      // Jumbo
      options.jumboSpace = ' ';
    } else {
      // Normal
      options.jumboSpace = '';
    }

    // Options: Blocks
    if ( convertedSettings[3] && convertedSettings[3].name === 'blocks_inline' ) {
      // Inline
      options.blockSpace = 0;
    } else {
      // Line Break
      options.blockSpace = 1;
    }

    // Options: Variables Naming
    if ( convertedSettings[4] && convertedSettings[4].name === 'variables_naming_descriptive' ) {
      // Descriptive
      options.variableNaming = 0;
    } else {
      // Normal
      options.variableNaming = 1;
    }

    // Options: Variables' Case
    if ( convertedSettings[5] && convertedSettings[5].name === 'variables_case_lower' ) {
      // lower_case
      options.variableCase = 0;
    } else {
      // camelCase
      options.variableCase = 1;
    }

    // Options: Functions Naming
    if ( convertedSettings[6] && convertedSettings[6].name === 'functions_naming_descriptive' ) {
      // Descriptive
      options.functionNaming = 0;
    } else {
      // Normal
      options.functionNaming = 1;
    }

    // Options: Functions Case
    if ( convertedSettings[7] && convertedSettings[7].name === 'functions_case_lower' ) {
      // lower_case
      options.functionCase = 0;
    } else {
      // camelCase
      options.functionCase = 1;
    }

    // Options: Comma in Variable Declaration
    if ( convertedSettings[8] && convertedSettings[8].name === 'variable_declaration_comma_leading' ) {
      // Leading Comma
      options.variableCommaPlace = 0;
    } else {
      // Trailing Comma
      options.variableCommaPlace = 1;
    }

    // Options: Concatenation
    if ( convertedSettings[9] && convertedSettings[9].name === 'variable_concatenation_leading' ) {
      // Leading
      options.concatenationPlace = 0;
    } else {
      // Trailing
      options.concatenationPlace = 1;
    }

    // Options: Quotes
    if ( convertedSettings[10] && convertedSettings[10].name === 'quotes_single' ) {
      // Single
      options.quoteChar = "'";
    } else {
      // Double
      options.quoteChar = '"';
    }

    // Options: Semicolons
    if ( convertedSettings[11] && convertedSettings[11].name === 'semicolons_no' ) {
      // No
      options.semicolon = '';
    } else {
      // Yes
      options.semicolon = ';';
    }

    // Options: Variable Declaration
    if ( convertedSettings[12] && convertedSettings[12].name === 'var_needed' ) {
      // As needed
      options.declareOnce = false;
    } else {
      // once
      options.declareOnce = true;
    }

    // Options: Require Brackets
    if ( convertedSettings[13] && convertedSettings[13].name === 'brackets_needed' ) {
      // As needed
      options.oneLineBrackets = false;
    } else {
      // once
      options.oneLineBrackets = true;
    }

    var templateFile = path.join( __dirname, '../', 'views/sampleCode.ejs' );
    var sampleCodeTemplateContent = fs.readFileSync( templateFile, { encoding: 'utf-8', flag: 'r' });
    var sampleCode = ejs.render( sampleCodeTemplateContent, options );

    return sampleCode;
  }

  // Get jshintrc code from a package settings array
  function getJSHintCode( convertedSettings ) {
    // If there are no settings, return an empty string
    if ( convertedSettings.length === 0 ) {
      return '';
    }

    //
    // Define the template options
    //

    var options = {};

    // Options: Indentation
    // -- Ignored in .jshintrc

    // Options: Spacing
    if ( convertedSettings[1] && convertedSettings[1].name === 'spacing_2_spaces' ) {
      // 2 Spaces
      options.indent = '2';
    } else {
      // 4 Spaces
      options.indent = '4';
    }

    // Options: Readability
    // -- Ignored in .jshintrc

    // Options: Blocks
    if ( convertedSettings[3] && convertedSettings[3].name === 'blocks_inline' ) {
      // Inline
      options.laxBreak = 'false';
    } else {
      // Line Break
      options.laxBreak = 'true';
    }

    // Options: Variables Naming
    // -- Ignored in .jshintrc

    // Options: Variables' Case
    if ( convertedSettings[5] && convertedSettings[5].name === 'variables_case_lower' ) {
      // lower_case
      options.camelCase = 'false';
    } else {
      // camelCase
      options.camelCase = 'true';
    }

    // Options: Functions Naming
    // -- Ignored in .jshintrc

    // Options: Functions Case
    if ( convertedSettings[7] && convertedSettings[7].name === 'functions_case_lower' ) {
      // lower_case
      options.camelCase = 'false';
    } else {
      // camelCase
      options.camelCase = 'true';
    }

    // Options: Comma in Variable Declaration
    if ( convertedSettings[8] && convertedSettings[8].name === 'variable_declaration_comma_leading' ) {
      // Leading Comma
      options.laxComma = 'true';
    } else {
      // Trailing Comma
      options.laxComma = 'false';
    }

    // Options: Concatenation
    // -- Ignored in .jshintrc

    // Options: Quotes
    if ( convertedSettings[10] && convertedSettings[10].name === 'quotes_single' ) {
      // Single
      options.quotMark = 'single';
    } else {
      // Double
      options.quotMark = 'double';
    }

    // Options: Semicolons
    if ( convertedSettings[11] && convertedSettings[11].name === 'semicolons_no' ) {
      // No
      options.asi = 'true';
    } else {
      // Yes
      options.asi = 'false';
    }

    // Options: Variable Declaration
    // -- Ignored in .jshintrc

    // Options: Require Brackets
    if ( convertedSettings[13] && convertedSettings[13].name === 'brackets_needed' ) {
      // As needed
      options.curly = 'false';
    } else {
      // once
      options.curly = 'true';
    }

    var templateFile = path.join( __dirname, '../', 'views/jshintrc.ejs' );
    var jshintrcCodeTemplateContent = fs.readFileSync( templateFile, { encoding: 'utf-8', flag: 'r' });
    var jshintrcCode = ejs.render( jshintrcCodeTemplateContent, options );

    return jshintrcCode;
  }

  return mongoose.model( 'Package', Package );
};

exports['@singleton'] = true;
exports['@require'] = [ 'igloo/mongo', 'igloo/mongoose-plugin', 'models/settings' ];
