
// # tests - packages

var util = require( 'util' );
var request = require( 'supertest' );
var app = require( '../app' );
var chai = require( 'chai' );
var sinon = require( 'sinon' );
var sinonChai = require( 'sinon-chai' );
var expect = chai.expect;
var utils = require( './utils' );
var async = require( 'async' );
var IoC = require( 'electrolyte' );
var cheerio = require( 'cheerio' );

chai.should();
chai.use( sinonChai );

request = request( app );

// storage for context-specific variables throughout the tests
var context = {};

describe( '/packages', function() {

  var Package = IoC.create( 'models/package' );

  // Test settings for our packages
  var testSettings = [];

  testSettings.push(
    '{"Indentation":"indentation_spaces","Spacing":"spacing_4_spaces","Readability":"readability_jumbo","Blocks":"blocks_inline","Variables Naming":"variables_naming_descriptive","Variables Case":"variables_case_camel","Functions Naming":"functions_naming_descriptive","Functions Case":"functions_case_camel","Comma in Variable Declaration":"variable_declaration_comma_trailing","Concatenation":"variable_concatenation_leading","Quotes":"quotes_single","Semicolons":"semicolons_yes\","Variable Declaration":"var_once\","Require Brackets":"brackets_always\"}'
  );

  testSettings.push(
    '{"Indentation":"indentation_spaces","Spacing":"spacing_4_spaces","Readability":"readability_jumbo","Blocks":"blocks_line_break","Variables Naming":"variables_naming_descriptive","Variables Case":"variables_case_camel","Functions Naming":"functions_naming_descriptive","Functions Case":"functions_case_camel","Comma in Variable Declaration":"variable_declaration_comma_trailing","Concatenation":"variable_concatenation_leading","Quotes":"quotes_single","Semicolons":"semicolons_yes\","Variable Declaration":"var_once\","Require Brackets":"brackets_always\"}'
  );

  testSettings.push(
    '{"Indentation":"indentation_spaces","Spacing":"spacing_2_spaces","Readability":"readability_normal","Blocks":"blocks_inline","Variables Naming":"variables_naming_normal","Variables Case":"variables_case_lower","Functions Naming":"functions_naming_normal","Functions Case":"functions_case_lower","Comma in Variable Declaration":"variable_declaration_comma_trailing","Concatenation":"variable_concatenation_leading","Quotes":"quotes_single","Semicolons":"semicolons_yes\","Variable Declaration":"var_once\","Require Brackets":"brackets_always\"}'
  );

  testSettings.push(
    '{"Indentation":"indentation_tabs","Spacing":"spacing_4_spaces","Readability":"readability_normal","Blocks":"blocks_inline","Variables Naming":"variables_naming_normal","Variables Case":"variables_case_lower","Functions Naming":"functions_naming_normal","Functions Case":"functions_case_lower","Comma in Variable Declaration":"variable_declaration_comma_trailing","Concatenation":"variable_concatenation_leading","Quotes":"quotes_single","Semicolons":"semicolons_yes\","Variable Declaration":"var_once\","Require Brackets":"brackets_always\"}'
  );

  // It's actually the same as testSettings[0]
  var testSettingIds = '2,3,5,7,9,12,13,16,18,19,21,23,25,27';

  // Clean DB and add 3 sample packages before tests start
  before( function( done ) {
    // We need the extra timeout because we need 1 second difference per package
    this.timeout( 5000 );

    async.waterfall([
      utils.cleanDatabase,
      function createTestPackages( callback ) {
        // Create 3 test packages
        async.timesSeries( 3, function( i, _callback ) {
          // We're doing this in a timeout so the creation date has 1 second difference ( so we can test sorting )
          setTimeout( function() {
            var _package = new Package({
              slug: 'package-' + i,
              settings: testSettings[ i ],
              views: i
            });

            _package.save( _callback );
          }, 1100 );
        }, callback );
      }
    ], done );
  });

  // Clean DB after all tests are done
  after( function( done ) {
    utils.cleanDatabase( done );
  });

  it( 'GET /packages - should return 500', function(done) {
    request
      .get( '/packages' )
      .accept( 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 500, done );
  });

  it( 'GET /packages/latest - should return a list of 3 packages, sorted by creation date', function( done ) {
    request
      .get( '/packages/latest' )
      .accept( 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) {
          return done( err );
        }

        // Test the attributes exist
        expect( res.body ).to.exist;
        expect( res.body.object ).to.exist;
        expect( res.body.has_more ).to.exist;
        expect( res.body.data ).to.exist;

        var data = res.body.data;

        data.should.have.lengthOf( 3 );

        var i;

        for ( i = 0; i < 3; ++i ) {
          data[ i ].should.have.property( 'id' );
          data[ i ].should.have.property( 'slug' );
          data[ i ].should.have.property( 'settings' );
          data[ i ].should.have.property( 'views' );
        }

        var j;

        // Test the values make sense ( with sorting: latest first )
        for ( i = 2, j = 0; i >= 0, j < 3; --i, ++j ) {
          data[ i ].slug.should.equal( 'package-' + j );
          data[ i ].settings.should.equal( testSettings[j] );
          data[ i ].views.should.equal( j );
        }

        done();
      });
  });

  it( 'GET /packages/popular - should return a list of 3 packages, sorted by popularity', function( done ) {
    request
      .get( '/packages/popular' )
      .accept( 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) {
          return done( err );
        }

        // Test the attributes exist
        expect( res.body ).to.exist;
        expect( res.body.object ).to.exist;
        expect( res.body.has_more ).to.exist;
        expect( res.body.data ).to.exist;

        var data = res.body.data;

        data.should.have.lengthOf( 3 );

        var i;

        for ( i = 0; i < 3; ++i ) {
          data[ i ].should.have.property( 'id' );
          data[ i ].should.have.property( 'slug' );
          data[ i ].should.have.property( 'settings' );
          data[ i ].should.have.property( 'views' );
        }

        // Test the values make sense
        for ( i = 0; i < 3; ++i ) {
          data[ i ].slug.should.contain( 'package-' );
          data[ i ].views.should.be.at.least( 0 );
        }

        // Test the proper sorting
        data[ 0 ].views.should.be.above( data[1].views );
        data[ 1 ].views.should.be.above( data[2].views );

        done();
      });
  });

  it( 'POST /packages - should return 200 if package was created', function( done ) {
    request
      .post( '/packages' )
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .accept( 'application/json' )
      .send({
        settings: testSettings[ 3 ]
      })
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) {
          return done( err );
        }

        var data = res.body;

        // Test the attributes exist
        expect( res.body ).to.exist;
        data.should.have.property( 'id' );
        data.should.have.property( 'slug' );
        data.should.have.property( 'settings' );
        data.should.have.property( 'views' );

        // Test the values make sense
        data.slug.length.should.equal( 6 );
        data.views.should.equal( 0 );

        // Store this package to use later
        context.createdPackage = res.body;

        done();
      });
  });

  it( 'POST /packages - should get existing package slug if package with the same settings already exists', function( done ) {
    request
      .post( '/packages' )
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .accept( 'application/json' )
      .send({
        settings: testSettings[ 3 ]
      })
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) {
          return done( err );
        }

        var data = res.body;

        // Test the attributes exist
        expect( data ).to.exist;
        data.should.have.property( 'id' );
        data.should.have.property( 'slug' );
        data.should.have.property( 'settings' );
        data.should.have.property( 'views' );

        // Test the values make sense
        data.id.should.equal( context.createdPackage.id );
        data.slug.should.equal( context.createdPackage.slug );
        data.settings.should.equal( context.createdPackage.settings );
        data.views.should.equal( context.createdPackage.views );

        done();
      });
  });

  it( 'POST /packages - should get 500 if settings are invalid JSON', function( done ) {
    request
      .post( '/packages' )
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .accept( 'application/json' )
      .send({
        settings: '{-}'
      })
      .expect( 'Content-Type', /json/ )
      .expect( 400, done );
  });

  it( 'GET /:slug — should return 200 if package was retrieved', function( done ) {
    request
      .get( util.format('/%s', context.createdPackage.slug) )
      .accept( 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) {
          return done( err );
        }

        var data = res.body;

        // Test the attributes exist
        expect( data ).to.exist;
        data.should.have.property( 'id' );
        data.should.have.property( 'slug' );
        data.should.have.property( 'settings' );
        data.should.have.property( 'views' );
        data.should.have.property( 'convertedSettings' );
        data.should.have.property( 'sampleCode' );
        data.should.not.have.property( 'email' );

        // Test the values make sense
        data.id.should.equal( context.createdPackage.id );
        data.slug.should.equal( context.createdPackage.slug );
        data.views.should.equal( 1 );// View was incremented when fetched
        data.convertedSettings.should.be.an.instanceOf( Array );

        done();
      });
  });

  it( 'GET /:slug/jshintrc — should return 200 if file was retrieved', function( done ) {
    request
      .get( util.format('/%s/jshintrc', context.createdPackage.slug) )
      .accept( 'text/plain' )
      .expect( 'Content-Type', /text/ )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) {
          return done( err );
        }

        // Test the values that make sense
        expect( res.text ).to.exist;

        res.text.should.have.string( '"maxerr"        : 50' );
        res.text.should.have.string( '"camelcase"     : false' );
        res.text.should.have.string( '"indent"        : 4' );
        res.text.should.have.string( '"lastsemic"     : false' );
        res.text.should.have.string( '"globals"       : {}' );

        done();
      });
  });

  // We're not allowing package updates
  it( 'PUT /packages/:id - should return 404', function( done ) {
    request
      .put( '/packages/' + context.createdPackage.id )
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .send({
        settings: testSettings[ 0 ]
      })
      .accept( 'application/json' )
      .expect( 'Content-Type', /html/ )
      .expect( 404 )
      .end( done );
  });

  // We're not allowing package deletion
  it( 'DELETE /packages/:id - should return 404', function( done ) {
    request
      .del( '/packages/' + context.createdPackage.id )
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .accept( 'application/json' )
      .expect( 'Content-Type', /html/ )
      .expect( 404 )
      .end( done );
  });

  it( 'GET /packages/preview - should return an unsaved package with proper simulated settings', function( done ) {
    request
      .get( '/packages/preview/' + testSettingIds )
      .accept( 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) {
          return done( err );
        }

        var data = res.body;

        // Test the attributes exist
        expect( data ).to.exist;

        data.should.have.property( 'id' );
        data.should.not.have.property( 'slug' );
        data.should.have.property( 'settings' );
        data.should.have.property( 'views' );
        data.should.have.property( 'convertedSettings' );
        data.should.have.property( 'sampleCode' );
        data.should.not.have.property( 'email' );

        // Test the values make sense
        data.settings.should.equal( testSettings[0] );
        data.convertedSettings.should.be.instanceOf( Array );

        done();
      });
  });
});