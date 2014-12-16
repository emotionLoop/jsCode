
// # tests - settings

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

describe( '/settings', function() {

  var settings = IoC.create( 'models/settings' );

  it( 'GET /settings - should return a list of settings, equal to the default 28', function( done ) {
    request
      .get( '/settings' )
      .accept( 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) {
          return done( err );
        }

        // Test the attributes exist
        expect( res.body ).to.exist;

        var data = res.body;

        data.length.should.equal( 28 );

        data[ 0 ].should.have.property( 'id' );
        data[ 0 ].should.have.property( 'name' );
        data[ 0 ].should.have.property( 'label' );
        data[ 0 ].should.have.property( 'group' );
        data[ 0 ].should.have.property( 'sorting' );
        data[ 0 ].should.have.property( 'helper' );

        data[ 1 ].should.have.property( 'id' );
        data[ 1 ].should.have.property( 'name' );
        data[ 1 ].should.have.property( 'label' );
        data[ 1 ].should.have.property( 'group' );
        data[ 1 ].should.have.property( 'sorting' );
        data[ 1 ].should.have.property( 'helper' );

        data[ 2 ].should.have.property( 'id' );
        data[ 2 ].should.have.property( 'name' );
        data[ 2 ].should.have.property( 'label' );
        data[ 2 ].should.have.property( 'group' );
        data[ 2 ].should.have.property( 'sorting' );
        data[ 2 ].should.have.property( 'helper' );

        // Store this setting to use later
        context.fetchedSetting = data[ 0 ];

        done();
      });
  });

  it( 'GET /settings/grouped - should return a list of settings, grouped into 14 groups', function( done ) {
    request
      .get( '/settings/grouped' )
      .accept( 'application/json' )
      .expect( 'Content-Type', /json/ )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) {
          return done( err );
        }

        // Test the attributes exist
        expect( res.body ).to.exist;

        var data = res.body;

        data.length.should.equal( 14 );

        data[ 0 ].should.have.property( 'settings' );
        data[ 0 ].should.have.property( 'name' );

        // Test the values make sense
        data[ 0 ].settings.length.should.be.at.least( 2 );

        done();
      });
  });

  // We're not allowing getting settings by id
  it( 'GET /settings/:id - should return 404', function( done ) {
    request
      .get( '/settings/' + context.fetchedSetting.id )
      .accept( 'application/json' )
      .expect( 'Content-Type', /html/ )
      .expect( 404, done );
  });

  // We're not allowing settings creation
  it( 'POST /settings - should return 404', function( done ) {
    request
      .post( '/settings' )
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .send({
        name: 'something'
      })
      .accept( 'application/json' )
      .expect( 'Content-Type', /html/ )
      .expect( 404, done );
  });

  // We're not allowing settings updates
  it( 'PUT /settings/:id - should return 404', function( done ) {
    request
      .put( '/settings/' + context.fetchedSetting.id )
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .send({
        name: 'something'
      })
      .accept( 'application/json' )
      .expect( 'Content-Type', /html/ )
      .expect( 404, done );
  });

  // We're not allowing settings deletion
  it( 'DELETE /settings/:id - should return 404', function( done ) {
    request
      .del( '/settings/' + context.fetchedSetting.id )
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .accept( 'application/json' )
      .expect( 'Content-Type', /html/ )
      .expect( 404 )
      .end( done );
  });

});